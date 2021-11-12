import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';


export default function TopBar() {
    const history = useHistory();

    return (
        <AppBar  >
            <Toolbar >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button
                        color="inherit"
                        onClick={() => history.push('/TriviaGame')}
                    >
                        <Typography variant="h5">Trivia Game</Typography>
                    </Button>
                </Typography>
                <Button
                    color="inherit"
                    onClick={() => history.push('./admin')}
                >
                    Admin
                </Button>
                <Button
                    color="inherit"
                    onClick={() => history.goBack()}
                >
                    Back
                </Button>
            </Toolbar>
        </AppBar >
    );
}