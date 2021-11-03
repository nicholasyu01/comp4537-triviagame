import React, { useState } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function EditQuestions(props) {
    const { ...rest } = props;

    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            gameId: rest.match.params.id,
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
    return (
        <Container>
            <Typography>Edit questions</Typography>
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