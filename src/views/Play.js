import React, { useState } from 'react';
import { Container, Typography, Box } from "@mui/material";
import GameSelection from './GameSelection';

// Play button component.
export default function Play() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container>
                <GameSelection editMode={false} />
            </Container>

        </div>
    );
}