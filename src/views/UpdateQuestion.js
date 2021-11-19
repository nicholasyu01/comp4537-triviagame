import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, List, ListItem, ListItemText, Checkbox, CircularProgress } from "@mui/material";
import EditGame from './EditGame';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import updateRequest from "../utils/updateRequest";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const QUESTION_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Create Button component.
export default function UpdateQuestion(props) {
    const { ...rest } = props
    const history = useHistory();
    const [questionId, setQuestionId] = useState(rest.match.params.id);
    const [question, setQuestion] = useState([]);
    const [questionName, setQuestionName] = useState();
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({
        ansA: '',
        ansB: '',
        ansC: '',
        ansD: ''
    });
    const { ansA, ansB, ansC, ansD } = answers;
    const [options, setOptions] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });
    const { a, b, c, d } = options;
    const [openAlert, setOpenAlert] = useState(false);

    const handleChecked = (event) => {
        setOptions({
            ...options,
            [event.target.name]: event.target.checked,
        });
    };

    const handleAnswers = (event) => {
        setAnswers({
            ...answers,
            [event.target.id]: event.target.value,
        });
    };
    const handleQuestionName = (event) => {
        setQuestionName(event.target.value)
    };

    // On submit, new values are posted to the add game API.
    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            gameId: question.gameId,
            question: event.target.question.value,
            options: [
                {
                    answer: event.target.ansA.value,
                    correct: a
                },
                {
                    answer: event.target.ansB.value,
                    correct: b
                },
                {
                    answer: event.target.ansC.value,
                    correct: c
                },
                {
                    answer: event.target.ansD.value,
                    correct: d
                }
            ]
        }
        axios.put(QUESTION_ENDPOINT + questionId, data,
            {
                headers: {
                    'Access-Control-Allow-Headers': ' Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Origin': '*',
                    'Method': 'PUT',
                    "x-access-token": "token-value",
                    'Content-Type': 'application/json',
                    mode: 'no-cors',
                }
            })
            .then(question => {
                updateRequest('618de52fd986f80f3ba925fe');
                if (question) {
                    // TODO add success feedback
                    history.goBack();
                } else {
                    console.log('fail')
                }
            })
            .catch((err) => {
                console.log(err)
                setOpenAlert(true);
            });
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    // On load, get question.
    useEffect(() => {
        axios.get(QUESTION_ENDPOINT + questionId)
            .then(q => {
                updateRequest('618de4fad986f80f3ba925fd');
                setQuestion(q.data)
                setQuestionName(q.data.question)
                setOptions({
                    a: q.data.options[0].correct,
                    b: q.data.options[1].correct,
                    c: q.data.options[2].correct,
                    d: q.data.options[3].correct
                });
                setAnswers({
                    ansA: q.data.options[0].answer,
                    ansB: q.data.options[1].answer,
                    ansC: q.data.options[2].answer,
                    ansD: q.data.options[3].answer
                })
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

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
                    <form onSubmit={onSubmit} id="questionsForm">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                id="question"
                                label="Question"
                                value={questionName}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleQuestionName}
                                style={{ width: '90%' }}

                            />
                            <div style={{ flexDirection: 'row' }}>
                                <Checkbox checked={a} onChange={handleChecked} name="a" />
                                <TextField
                                    id="ansA"
                                    label="Answer"
                                    value={ansA}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleAnswers}
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div style={{ flexDirection: 'row' }}>

                                <Checkbox checked={b} onChange={handleChecked} name="b" />
                                <TextField
                                    id="ansB"
                                    label="Answer"
                                    value={ansB}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleAnswers}
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div style={{ flexDirection: 'row' }}>


                                <Checkbox checked={c} onChange={handleChecked} name="c" />
                                <TextField
                                    id="ansC"
                                    label="Answer"
                                    value={ansC}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleAnswers}
                                    style={{ width: '80%' }}
                                />
                            </div>
                            <div style={{ flexDirection: 'row' }}>

                                <Checkbox checked={d} onChange={handleChecked} name="d" />
                                <TextField
                                    id="ansD"
                                    label="Answer"
                                    value={ansD}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleAnswers}
                                    style={{ width: '80%' }}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: 5 }}
                        >
                            Update Question
                        </Button>
                    </form>
                </Container>
            }
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    Error updating Question.
                </Alert>
            </Snackbar>
        </div>

    );
}