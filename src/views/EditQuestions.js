import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Component for editing questions page.
export default function EditQuestions(props) {
    const { ...rest } = props;
    const [questions, setQuestions] = useState([]);
    const [gameId, setGameId] = useState(rest.match.params.id);

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
                    correct: true
                },
                {
                    answer: event.target.ans2.value,
                    correct: false
                },
                {
                    answer: event.target.ans3.value,
                    correct: false
                },
                {
                    answer: event.target.ans4.value,
                    correct: false
                }
            ]
        }
        axios.post('http://localhost:5000/api/question/add', data)
            .then(game => {
                if (game) {
                    console.log('success')
                } else {
                    console.log('fail')
                }
            })
            .catch((err) => console.log(err));
    }

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
                            <ListItemText>{row.answer}</ListItemText>
                        ))}
                    </ListItem>
                ))}
            </List>
            <form onSubmit={onSubmit} id="gameForm">
                <div >
                    <TextField
                        // className={classes.formControl}
                        id="question"
                        label="Question"
                    />
                    <TextField
                        // className={classes.formControl}
                        id="ans1"
                        label="Answer"
                    />                   <TextField
                        // className={classes.formControl}
                        id="ans2"
                        label="Answer"
                    />                   <TextField
                        // className={classes.formControl}
                        id="ans3"
                        label="Answer"
                    />                   <TextField
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