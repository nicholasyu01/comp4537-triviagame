import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import GameSelection from './GameSelection';

export default function Create() {

    return (
        <Container>
            <Typography>Create</Typography>
            <GameSelection editMode={true} />
        </Container>
    );
}