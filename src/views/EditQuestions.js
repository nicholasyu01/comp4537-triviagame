import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, List, ListItem, ListItemText, Checkbox } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Component for editing questions page.
export default function EditQuestions(props) {
    const { ...rest } = props;
    const [questions, setQuestions] = useState([]);
    const [gameId, setGameId] = useState(rest.match.params.id);
    const [options, setOptions] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });
    const { a, b, c, d } = options;

    const history = useHistory();

    // On submit, new values are posted to the add game API.
    // (IS THIS ENDPOINT CORRECT?)
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
        axios.post('http://localhost:5000/api/question/add', data)
            .then(game => {
                if (game) {
                    axios.get('http://localhost:5000/api/question/game/' + gameId)
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

    const handleChange = (event) => {
        setOptions({
            ...options,
            [event.target.name]: event.target.checked,
        });
    };

    // On load, sets quizzes in list onto the component's list.
    useEffect(() => {
        axios.get('http://localhost:5000/api/question/game/' + gameId)
            .then(q => {
                setQuestions(q.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Returns EditQuestions container.
    return (
        <Container>
            <Typography>Edit questions</Typography>
            <List >
                {questions?.map((row, key) => (
                    <ListItem key={key}>
                        <ListItemText
                            primary={row.question}
                        />

                        {row.options.map((row) => (
                            <>
                                {
                                    row.correct ?
                                        <ListItemText>correct: {row.answer}</ListItemText>
                                        :
                                        <ListItemText>{row.answer}</ListItemText>

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
        </Container>
    );
}