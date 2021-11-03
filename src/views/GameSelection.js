import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Container, Button, Typography } from "@mui/material";
import Quiz from "./Quiz";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Component for selecting quiz. Has states for currently selected quiz and quiz data.
export default function GameSelection(props) {
    const [gameSelected, setGameSelected] = useState('');
    const [gameData, setGameData] = useState([]);
    const history = useHistory();
    const { editMode } = props;

    // Columns for characterizing and organizing quizzes.
    const columns = [
        {
            headerName: 'Game',
            field: 'gameName',
            headerAlign: 'center',
            width: 140,
        },
        {
            headerName: 'Theme',
            field: 'theme',
            headerAlign: 'center',
            width: 140,
        },
        {
            headerName: 'Questions',
            field: 'numQuestions',
            headerAlign: 'center',
            width: 140,
        },
        {
            headerName: 'Date',
            field: 'date',
            headerAlign: 'center',
            width: 140,
        },
    ];

    // UNUSED
    const rows = [
        {
            id: 1,
            gameName: 'Science',
            theme: 'education',
            numQuestions: '5',
            date: '2020'
        },
        {
            id: 1,
            gameName: 'Math',
            theme: 'education',
            numQuestions: '4',
            date: '2020'
        },
        {
            id: 1,
            gameName: 'christmas',
            theme: 'holiday',
            numQuestions: '6',
            date: '2020'
        },
    ];

    // On load, sets quizzes in list onto the component's list.
    useEffect(() => {
        axios.get('http://localhost:5000/api/game')
            .then(games => {
                setGameData(games.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Returns the component.
    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={gameData}
                columns={columns}
                disableColumnFilter={true}
                disableColumnMenu={true}
                // hideFooter={true}
                // loading={true}
                getRowId={(row) => row._id}
                onRowClick={(event) => {
                    setGameSelected(event.id)
                }}
            />
            {
                editMode ?
                    <div>
                        <Button onClick={() => history.push('/edit')} variant="contained">
                            Create Game
                        </Button>
                        <Button
                            onClick={() => history.push('/questions/' + gameSelected)}
                            variant="contained"
                            disabled={!gameSelected}
                        >
                            Edit Game
                        </Button>
                    </div>
                    :
                    <Button
                        onClick={() => history.push('/quiz/' + gameSelected)}
                        variant="contained"
                        disabled={!gameSelected}
                    >
                        Play
                    </Button>
            }
        </div >
    );
}