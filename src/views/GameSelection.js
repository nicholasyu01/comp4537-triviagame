import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {
    Container, Button, Typography, List, ListItem, ListItemText, Checkbox,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import Quiz from "./Quiz";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Component for selecting quiz. Has states for currently selected quiz and quiz data.
export default function GameSelection(props) {
    const [gameId, setGameId] = useState('');
    const [gameName, setGameName] = useState();
    const [gameData, setGameData] = useState([]);
    const history = useHistory();
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState([]);
    const { editMode } = props;

    const handleClose = () => {
        setDeleteDialog(false);
    };

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

    const handleDelete = () => {
        axios.delete('http://localhost:5000/api/game/' + gameId)
            .then(game => {
                // delete questions of the game
                axios.delete('http://localhost:5000/api/question/game/delete/' + gameId)
                    .then(q => {
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                // get game data list
                axios.get('http://localhost:5000/api/game')
                    .then(games => {
                        setGameData(games.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                setDeleteDialog(false);
            })
    };


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
                    setGameId(event.id)
                    setGameName(event.gameName)
                }}
            />
            {
                editMode ?
                    <div>
                        <Button onClick={() => history.push('/create')} variant="contained">
                            Create Game
                        </Button>
                        <Button
                            onClick={() => history.push('/questions/' + gameId)}
                            variant="contained"
                            disabled={!gameId}
                        >
                            Edit Game
                        </Button>
                        <Button
                            onClick={() => {
                                setDeleteDialog(true);
                            }}
                            variant="contained"
                            disabled={!gameId}
                        >
                            Delete Game
                        </Button>
                    </div>
                    :
                    <Button
                        onClick={() => history.push('/quiz/' + gameId)}
                        variant="contained"
                        disabled={!gameId}
                    >
                        Play
                    </Button>
            }
            <Dialog
                open={deleteDialog}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to delete this Game?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Game: {gameName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}