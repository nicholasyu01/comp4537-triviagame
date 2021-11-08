import React, { useState } from 'react';
import { Container, Typography } from "@mui/material";
import EditGame from './EditGame';

// Create Button component.
export default function Create() {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <EditGame editMode={true} />
        </div>
    );
}