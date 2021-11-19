import React, { useState, useEffect } from 'react';
import {
    Container, Button, Typography, List, ListItem, ListItemText, Checkbox,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import updateRequest from "../utils/updateRequest";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const QUESTION_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/';
const QUESTION_ADD_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/add/';
const QUESTION_GAME_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/game/';
const GAME_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/game/';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Component for editing questions page.
export default function EditQuestions(props) {
    const { ...rest } = props;
    const [questions, setQuestions] = useState([]);
    const [gameId, setGameId] = useState(rest.match.params.id);
    const [gameName, setGameName] = useState();
    const [options, setOptions] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });
    const { a, b, c, d } = options;
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteQuestion, setDeleteQuestion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertInvalid, setOpenAlertInvalid] = useState(false);
    const [openAlertQuestion, setOpenAlertQuestion] = useState(false);
    const [openAlertInvalidQuestion, setOpenAlertInvalidQuestion] = useState(false);
    const [openAlertDelete, setOpenAlertDelete] = useState(false);

    const handleClose = () => {
        setDeleteDialog(false);
    };

    const handleDelete = () => {
        axios.delete(QUESTION_ENDPOINT + deleteQuestion?._id)
            .then(q => {
                updateRequest('618de553d986f80f3ba925ff');
                axios.get(QUESTION_GAME_ENDPOINT + gameId)
                    .then(q => {
                        setOpenAlertDelete(true);
                        setQuestions(q.data)
                        updateRequest('618de3fbd986f80f3ba925f9');
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            })
        setDeleteDialog(false);
    };

    const history = useHistory();

    // On submit, new values are posted to the add game API.
    const onSubmit = (event) => {
        event.preventDefault()
        if (!event.target.question?.value ||
            !event.target.ans1?.value ||
            !event.target.ans2?.value ||
            !event.target.ans3?.value ||
            !event.target.ans4?.value
        ) {
            setOpenAlertInvalidQuestion(true)
            return
        } else {

            const data = {
                gameId: gameId,
                question: event.target.question.value,
                options: [
                    {
                        answer: event.target.ans1.value,
                        correct: a
                    },
                    {
                        answer: event.target.ans2.value,
                        correct: b
                    },
                    {
                        answer: event.target.ans3.value,
                        correct: c
                    },
                    {
                        answer: event.target.ans4.value,
                        correct: d
                    }
                ]
            }
            axios.post(QUESTION_ADD_ENDPOINT, data)
                .then(game => {
                    updateRequest('618de57bd986f80f3ba92600');
                    if (game) {
                        axios.get(QUESTION_GAME_ENDPOINT + gameId)
                            .then(q => {
                                setQuestions(q.data)
                                updateRequest('618de950d986f80f3ba92602');
                                setOpenAlertQuestion(true);
                            })
                            .catch(function (error) {
                                setOpenAlertInvalidQuestion(true);
                                console.log(error);
                            })
                        console.log('success')
                        document.getElementById("questionsForm").reset();
                        setOptions({
                            a: false,
                            b: false,
                            c: false,
                            d: false
                        });
                    } else {
                        console.log('fail')
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    const submitGame = (event) => {
        event.preventDefault()
        if (!event.target.gameName?.value) {
            setOpenAlertInvalid(true)
            return
        }
        const data = {
            gameName: event.target.gameName.value
        }
        axios.put(GAME_ENDPOINT + gameId, data,)
            .then(game => {
                updateRequest('618de456d986f80f3ba925fa');
                if (game) {
                    setOpenAlert(true)
                } else {
                    setOpenAlertInvalid(true)
                    console.log('fail')
                }
            })
            .catch((err) => {
                console.log(err)
                setOpenAlertInvalid(true);
            });
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertInvalidQuestion(false);
        setOpenAlertInvalid(false);
        setOpenAlert(false);
        setOpenAlertQuestion(false);
        setOpenAlertDelete(false);
    };

    const handleChange = (event) => {
        setOptions({
            ...options,
            [event.target.name]: event.target.checked,
        });
    };

    const handleGameName = (e) => {
        setGameName(e.target.value)
    };

    // On load, sets quizzes in list onto the component's list.
    useEffect(() => {
        axios.get(QUESTION_GAME_ENDPOINT + gameId)
            .then(q => {
                setQuestions(q.data)
                setLoading(false);
                updateRequest('618de950d986f80f3ba92602');
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get(GAME_ENDPOINT + gameId)
            .then(game => {
                updateRequest('618de3fbd986f80f3ba925f9');
                setGameName(game.data.gameName);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Returns EditQuestions container.
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50
            }}
        >
            {loading ?
                <CircularProgress />
                :

                <Container>
                    <form onSubmit={submitGame} id="gameForm">
                        <div>
                            <TextField
                                id="gameName"
                                label="Game Name"
                                value={gameName}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleGameName}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: 5 }}
                        >
                            Update Game
                        </Button>
                    </form>
                    <TableContainer sx={{ maxHeight: 200 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                {questions?.map((row, key) => {
                                    return (
                                        <>
                                            <TableRow key={row.code}>
                                                <TableCell key={row.id} align={row.align}>
                                                    <b>Q.{row.question}</b>
                                                </TableCell>
                                                {row.options.map((o) => {
                                                    return (
                                                        <>
                                                            {
                                                                o.correct ?
                                                                    <TableCell key={o.id} align={o.align}>
                                                                        <b>&#10004; </b><i>{o.answer}</i>
                                                                    </TableCell>
                                                                    :
                                                                    <TableCell key={o.id} align={o.align}>
                                                                        <b>&#x58; </b><i>{o.answer}</i>
                                                                    </TableCell>

                                                            }

                                                        </>
                                                    );
                                                })}
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    style={{ margin: 5 }}
                                                    onClick={() => {
                                                        history.push('/updateQuestion/' + row._id)
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    onClick={() => {
                                                        setDeleteQuestion(row);
                                                        setDeleteDialog(true);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <form onSubmit={onSubmit} id="questionsForm">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                // className={classes.formControl}
                                id="question"
                                label="Question"
                                style={{ width: '90%' }}
                            />
                            <div style={{ flexDirection: 'row' }}>
                                <Checkbox checked={a} onChange={handleChange} name="a" />
                                <TextField
                                    // className={classes.formControl}
                                    id="ans1"
                                    label="Answer"
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div style={{ flexDirection: 'row' }}>
                                <Checkbox checked={b} onChange={handleChange} name="b" />
                                <TextField
                                    // className={classes.formControl}
                                    id="ans2"
                                    label="Answer"
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div style={{ flexDirection: 'row' }}>
                                <Checkbox checked={c} onChange={handleChange} name="c" />
                                <TextField
                                    // className={classes.formControl}
                                    id="ans3"
                                    label="Answer"
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div style={{ flexDirection: 'row' }}>
                                <Checkbox checked={d} onChange={handleChange} name="d" />
                                <TextField
                                    // className={classes.formControl}
                                    id="ans4"
                                    label="Answer"
                                    style={{ width: '80%' }}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: 5 }}
                        >
                            Create Question
                        </Button>
                    </form>
                    <Dialog
                        open={deleteDialog}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Are you sure you want to delete this question?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Question: {deleteQuestion?.question}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            }
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Game was successfuly updated.
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertInvalid} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    Error updating Game.
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertQuestion} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Question was successfuly created.
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertInvalidQuestion} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    Error creating Question.
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertDelete} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                    Game was successfuly deleted.
                </Alert>
            </Snackbar>
        </div>
    );
}