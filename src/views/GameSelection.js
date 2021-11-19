import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {
    Container, Typography, List, ListItem, ListItemText, Checkbox,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box
} from "@mui/material";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import updateRequest from "../utils/updateRequest";
import historyPush from "../utils/historyPush";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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
    const [openAlert, setOpenAlert] = useState(false);

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

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const handleDelete = () => {
        axios.delete('https://comp4537triviagame-api.herokuapp.com/api/v1/game/' + gameId)
            .then(game => {
                updateRequest('618de4a2d986f80f3ba925fb');
                setOpenAlert(true);
                // delete questions of the game
                axios.delete('https://comp4537triviagame-api.herokuapp.com/api/question/game/v1/delete/' + gameId)
                    .then(q => {
                        updateRequest('618de971d986f80f3ba92603');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                // get game data list
                axios.get('https://comp4537triviagame-api.herokuapp.com/api/v1/game')
                    .then(games => {
                        updateRequest('618dc2eb1c9dc9e9dd874e33');
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
        axios.get('https://comp4537triviagame-api.herokuapp.com/api/v1/game')
            .then(games => {
                setGameData(games.data)
                setLoading(false)
                updateRequest('618dc2eb1c9dc9e9dd874e33');
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
                        setGameName(event.row.gameName)
                    }}
                />
            </div>

            {
                editMode ?
                    <>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                history.push('/questions/' + gameId)
                                // historyPush(history, '/questions/' + gameId);
                            }}
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
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Game was successfuly deleted.
                </Alert>
            </Snackbar>
        </Container>
    );
}