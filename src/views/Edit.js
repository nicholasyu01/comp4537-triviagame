import React, { useState } from 'react';
import { Container, Typography, Box } from "@mui/material";
import GameSelection from './GameSelection';

// Create Button component.
export default function Edit() {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Container>
                <GameSelection editMode={true} />
            </Container>

        </div>
    );
}