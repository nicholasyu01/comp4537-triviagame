import React, { useState } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import updateRequest from "../utils/updateRequest";
import historyPush from "../utils/historyPush";

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
        axios.post('https://comp4537triviagame-api.herokuapp.com/api/v1/game/add', data)
            .then(game => {
                if (game) {
                    history.push('/questions/' + game.data._id)
                    console.log('success')
                    updateRequest('618de4cdd986f80f3ba925fc')
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
                    style={{ marginTop: 5 }}
                >
                    Create Game
                </Button>
            </form>
        </div>
    );
}