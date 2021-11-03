import React, { useState } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function EditQuestions() {
    const history = useHistory();

    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            gameName: event.target.gameName.value,
        }
        axios.post('http://localhost:5000/api/game/add', data)
            .then(game => {
                if (game) {
                    history.push('/edit/' + game.data._id)
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
                        id="gameName"
                        label="Question"
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