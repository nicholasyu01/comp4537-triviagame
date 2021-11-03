import React, { useState } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Component for Editing Quiz
export default function EditGame() {

    // History
    const history = useHistory();

    // IN PROGRESS
    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            gameName: event.target.gameName.value,
        }
        axios.post('http://localhost:5000/api/game/add', data)
            .then(game => {
                if (game) {
                    history.push('/edit/questions/' + game.data._id)
                    console.log('success')
                } else {
                    console.log('fail')
                }
            })
            .catch((err) => console.log(err));
    }

    // Returns edit component
    return (
        <div>
            <form onSubmit={onSubmit} id="gameForm">
                <div >
                    <TextField
                        // className={classes.formControl}
                        id="gameName"
                        label="Name"
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                >
                    Create Game
                </Button>
            </form>
        </div>
    );
}