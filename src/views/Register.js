import React, { useState } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Create Register page component.
export default function Register() {

    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        axios.post("https://comp4537triviagame-api.herokuapp.com/api/v1/user/register", data)
            .then(res => console.log('success'))
            .catch(err =>
                console.log(err)
            );
    }


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <form onSubmit={onSubmit} id="adminForm">
                <div >
                    <TextField
                        id="username"
                        label="Username"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 5 }}
                >
                    Register
                </Button>
            </form>
        </div>
    );
}