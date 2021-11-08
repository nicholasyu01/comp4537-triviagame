import React, { useState } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

// Home page; contains buttons for either playing an existing game or creating new game.
export default function TriviaGame() {

    // Used for navigation (?)
    const history = useHistory();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box sx={{
                display: 'grid', gridTemplateRows: 'repeat(2, 1fr)', textAlign: 'center',
            }}>
                <Typography variant="h3">Trivia Game</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, }}>
                    <Button onClick={() => history.push('/play')} variant="contained">Play</Button>
                    <Button onClick={() => history.push('/create')} variant="contained">Create</Button>
                    <Button onClick={() => history.push('/edit')} variant="contained">Edit</Button>
                </Box>
            </Box>

        </div>

    );
}
