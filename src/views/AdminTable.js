import React, { useState, useEffect } from 'react';
import {
    Container, Button, Typography, List, ListItem, ListItemText, Checkbox,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const QUESTION_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/';
const QUESTION_ADD_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/add/';
const QUESTION_GAME_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/question/game/';
const GAME_ENDPOINT = 'https://comp4537triviagame-api.herokuapp.com/api/v1/game/';

// Component for editing questions page.
export default function EditQuestions() {
    const [loading, setLoading] = useState(true);
    const [requestData, setRequestData] = useState([]);

    const history = useHistory();


    const columns = [
        { id: 'method', label: 'Method' },
        { id: 'endpoint', label: 'EndPoint' },
        { id: 'requests', label: 'Requests' },

    ];


    // On load, sets quizzes in list onto the component's list.
    useEffect(() => {
        axios.get('https://comp4537triviagame-api.herokuapp.com/api/v1/request')
            .then(data => {
                setRequestData(data.data)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <div>
            {loading ?
                <CircularProgress />
                :
                <Container>
                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {requestData?.map((row, key) => {
                                    return (
                                        <>
                                            <TableRow key={row.code}>
                                                <TableCell key={row.id} align={row.align}>
                                                    <b>{row.type}</b>
                                                </TableCell>
                                                <TableCell key={row.id} align={row.align}>
                                                    <b>{row.endpoint}</b>
                                                </TableCell>
                                                <TableCell key={row.id} align={row.align}>
                                                    <b>{row.requests}</b>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            }
        </div>
    );
}