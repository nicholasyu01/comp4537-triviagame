import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useHistory } from 'react-router-dom';

// Home page; contains buttons for either playing an existing game or creating new game.
export default function TriviaGame() {

    // Used for navigation (?)
    const history = useHistory();

    return (
        <Container>
            <Typography>Trivia Game</Typography>
            <Button onClick={() => history.push('/play')} variant="contained">Play</Button>
            <Button onClick={() => history.push('/create')} variant="contained">Create</Button>
        </Container>
    );
}
