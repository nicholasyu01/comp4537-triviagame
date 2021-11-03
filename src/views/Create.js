import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import EditGame from './EditGame';

// Create Button component.
export default function Create() {

    return (
        <Container>
            <Typography>Create</Typography>
            <EditGame editMode={true} />
        </Container>
    );
}