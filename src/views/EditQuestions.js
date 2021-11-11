import React, { useState, useEffect } from 'react';
import {
    Container, Button, Typography, List, ListItem, ListItemText, Checkbox,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress
} from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const QUESTION_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/question/';
const QUESTION_ADD_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/question/add/';
const QUESTION_GAME_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/question/game/';
const GAME_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/game/';

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
    const [updateGameResult, setUpdateGameResult] = useState();
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        setDeleteDialog(false);
    };

    const handleDelete = () => {
        axios.delete(QUESTION_ENDPOINT + deleteQuestion?._id)
            .then(q => {
                axios.get(QUESTION_GAME_ENDPOINT + gameId)
                    .then(q => {
                        setQuestions(q.data)
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
                if (game) {
                    axios.get(QUESTION_GAME_ENDPOINT + gameId)
                        .then(q => {
                            setQuestions(q.data)
                        })
                        .catch(function (error) {
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

    const submitGame = (event) => {
        event.preventDefault()
        const data = {
            gameName: event.target.gameName.value
        }
        axios.put(GAME_ENDPOINT + gameId, data,)
            .then(game => {
                if (game) {
                    setUpdateGameResult(true);
                } else {
                    setUpdateGameResult(false);
                    console.log('fail')
                }
            })
            .catch((err) => console.log(err));
    }
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
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get(GAME_ENDPOINT + gameId)
            .then(game => {
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
                alignItems: "center"
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
                        >
                            Update Game
                        </Button>
                        {updateGameResult ?
                            <div>success</div> :
                            null
                        }
                    </form>
                    <List >
                        {questions?.map((row, key) => (
                            <ListItem key={key}>
                                <ListItemText
                                    primary={<b>Q. {row.question}</b>}
                                />

                                {row.options.map((row) => (
                                    <>
                                        {
                                            row.correct ?
                                                <ListItemText><b>&#10004;</b>: <i>{row.answer}</i></ListItemText>
                                                :
                                                <ListItemText><b>&#x58;</b>: <i>{row.answer}</i></ListItemText>

                                        }
                                    </>
                                ))}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        history.push('../updateQuestion/' + row._id)
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
                            </ListItem>
                        ))}
                    </List>
                    <form onSubmit={onSubmit} id="questionsForm">
                        <div>
                            <TextField
                                // className={classes.formControl}
                                id="question"
                                label="Question"
                            />
                            <Checkbox checked={a} onChange={handleChange} name="a" />
                            <TextField
                                // className={classes.formControl}
                                id="ans1"
                                label="Answer"
                            />
                            <Checkbox checked={b} onChange={handleChange} name="b" />
                            <TextField
                                // className={classes.formControl}
                                id="ans2"
                                label="Answer"
                            />
                            <Checkbox checked={c} onChange={handleChange} name="c" />
                            <TextField
                                // className={classes.formControl}
                                id="ans3"
                                label="Answer"
                            />
                            <Checkbox checked={d} onChange={handleChange} name="d" />
                            <TextField
                                // className={classes.formControl}
                                id="ans4"
                                label="Answer"
                            />

                        </div>
                        <Button
                            type="submit"
                            variant="contained"
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
        </div>
    );
}