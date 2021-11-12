import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import AdminTable from './AdminTable';

// Create Button component.
export default function Admin() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwtToken"));

    const history = useHistory();
    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        axios.post("https://comp4537triviagame-api.herokuapp.com/api/v1/user/login", data)
            .then(res => {

                // Set token to localStorage
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);

                setLoggedIn(true)
            })
            .catch(err =>
                console.log(err)
            );
    }


    // On load, get question.
    useEffect(() => {
        setLoggedIn(localStorage.getItem("jwtToken"));
    }, [loggedIn]);



    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >{
                loggedIn ?
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <AdminTable />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ marginTop: 5 }}
                            onClick={() => {
                                localStorage.removeItem('jwtToken');
                                history.go(0); //refreshes page
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                    :
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
                            Login
                        </Button>
                    </form>
            }
        </div>
    );
}