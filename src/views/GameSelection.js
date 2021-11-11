import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {
    Container, Typography, List, ListItem, ListItemText, Checkbox,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box
} from "@mui/material";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';


// Component for selecting quiz. Has states for currently selected quiz and quiz data.
export default function GameSelection(props) {
    const [gameId, setGameId] = useState('');
    const [gameName, setGameName] = useState();
    const [gameData, setGameData] = useState([]);
    const history = useHistory();
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState([]);
    const { editMode } = props;
    const [loading, setLoading] = useState(true);

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
        // {
        //     headerName: 'Theme',
        //     field: 'theme',
        //     headerAlign: 'center',
        //     width: 140,
        // },
        // {
        //     headerName: 'Questions',
        //     field: 'numQuestions',
        //     headerAlign: 'center',
        //     width: 140,
        // },
        // {
        //     headerName: 'Date',
        //     field: 'date',
        //     headerAlign: 'center',
        //     width: 140,
        // },
    ];

    const handleDelete = () => {
        axios.delete('https://comp4537triviagame-api.herokuapp.com/api/game/' + gameId)
            .then(game => {
                // delete questions of the game
                axios.delete('https://comp4537triviagame-api.herokuapp.com/api/question/game/delete/' + gameId)
                    .then(q => {
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                // get game data list
                axios.get('https://comp4537triviagame-api.herokuapp.com/api/game')
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
        axios.get('https://comp4537triviagame-api.herokuapp.com/api/game')
            .then(games => {
                setGameData(games.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Returns the component.
    return (
        <Container>
            <div style={{
                height: 400, width: '100%'
            }}>
                <DataGrid
                    rows={gameData}
                    columns={columns}
                    disableColumnFilter={true}
                    disableColumnMenu={true}
                    hideFooter={true}
                    loading={loading}
                    getRowId={(row) => row._id}
                    onRowClick={(event) => {
                        setGameId(event.id)
                        setGameName(event.gameName)
                    }}
                />
            </div>

            {
                editMode ?
                    <>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => history.push('/questions/' + gameId)}
                            disabled={!gameId}
                            style={{ margin: 5 }}
                        >
                            Edit Game
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => {
                                setDeleteDialog(true);
                            }}
                            disabled={!gameId}
                            style={{ margin: 5 }}
                        >
                            Delete Game
                        </Button>
                    </>
                    :
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => history.push('/quiz/' + gameId)}
                        disabled={!gameId}
                        style={{ margin: 5 }}
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
        </Container>
    );
}