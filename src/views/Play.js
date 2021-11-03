import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import GameSelection from './GameSelection';

export default function Play() {
    return (
        <Container>
            <Typography>Play</Typography>
            <GameSelection editMode={false} />
        </Container>
    );
}