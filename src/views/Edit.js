import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import GameSelection from './GameSelection';

// Create Button component.
export default function Edit() {

    return (
        <Container>
            <Typography>Edit Game</Typography>
            <GameSelection editMode={true} />
        </Container>
    );
}