import React, { useState } from 'react';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import updateRequest from "../utils/updateRequest";
import historyPush from "../utils/historyPush";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Component for Editing Quiz
export default function EditGame() {
    const [openAlert, setOpenAlert] = useState(false);

    // History
    const history = useHistory();

    // IN PROGRESS
    const onSubmit = (event) => {
        event.preventDefault()
        if (!event.target.gameName?.value) {
            setOpenAlert(true)
            return
        }
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
            .catch((err) => {
                console.log(err)
                setOpenAlert(true);
            });
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

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
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                    Error creating Game.
                </Alert>
            </Snackbar>
        </div>
    );
}