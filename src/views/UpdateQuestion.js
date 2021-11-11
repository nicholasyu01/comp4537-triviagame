import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, List, ListItem, ListItemText, Checkbox, CircularProgress } from "@mui/material";
import EditGame from './EditGame';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

const QUESTION_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/question/';

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
                if (question) {
                    // TODO add success feedback
                    history.goBack();
                } else {
                    console.log('fail')
                }
            })
            .catch((err) => console.log(err));
    }

    // On load, get question.
    useEffect(() => {
        axios.get(QUESTION_ENDPOINT + questionId)
            .then(q => {
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
                        <div>
                            <TextField
                                // className={classes.formControl}
                                id="question"
                                label="Question"
                                value={questionName}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleQuestionName}
                            />
                            <Checkbox checked={a} onChange={handleChecked} name="a" />
                            <TextField
                                // className={classes.formControl}
                                id="ansA"
                                label="Answer"
                                value={ansA}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleAnswers}
                            />
                            <Checkbox checked={b} onChange={handleChecked} name="b" />
                            <TextField
                                // className={classes.formControl}
                                id="ansB"
                                label="Answer"
                                value={ansB}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleAnswers}
                            />
                            <Checkbox checked={c} onChange={handleChecked} name="c" />
                            <TextField
                                // className={classes.formControl}
                                id="ansC"
                                label="Answer"
                                value={ansC}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleAnswers}
                            />
                            <Checkbox checked={d} onChange={handleChecked} name="d" />
                            <TextField
                                // className={classes.formControl}
                                id="ansD"
                                label="Answer"
                                value={ansD}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleAnswers}
                            />

                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Update Question
                        </Button>
                    </form>
                </Container>
            }
        </div>

    );
}