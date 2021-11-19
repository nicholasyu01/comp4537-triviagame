import React, { useState, useEffect } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import AdminTable from './AdminTable';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Create Button component.
export default function Admin() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwtToken"));
    const [openAlert, setOpenAlert] = useState(false);

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
            .catch(err => {
                console.log(err)
                setOpenAlert(true);
            }
            );
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

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
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    Error Invalid Login.
                </Alert>
            </Snackbar>
        </div>
    );
}