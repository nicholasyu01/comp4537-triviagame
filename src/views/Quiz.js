import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useHistory } from 'react-router-dom';
import updateRequest from "../utils/updateRequest";

// Component for a Quiz. Has states for current question in the quiz, a boolean for 
// if a quiz (game) is over, quiz score, quiz id, and a list of all quiz questions.
export default function Quiz(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isEndQuiz, setIsEndQuiz] = useState(false);
    const [score, setScore] = useState(0);
    const { ...rest } = props;
    const [id, setId] = useState(rest.match.params.id);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    // If question is correct, increment score by one and set current question to next question. 
    // If no next question, end game.
    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setIsEndQuiz(true);
        }
    };

    // On page load, set questions for selected quiz.
    useEffect(() => {
        axios.get('https://comp4537triviagame-api.herokuapp.com/api/v1/question/game/' + id)
            .then(questions => {
                setQuestions(questions.data);
                setLoading(false);
                updateRequest('618de971d986f80f3ba92603');
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const divStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const optionStyle = {
        justifyContent: "center",
        alignItems: "center"
    }

    const optionLetterStyle = {
        margin: "0",
        padding: "0",
        paddingTop: "10px"
    }

    const buttonDivStyle = {
        padding: "0",
        justifyContent: "space-between",
        display: "flex",
        marginBottom: "10px"
    }

    const buttonStyle = {
        marginLeft: "10px",
        width: "100%",
        justifyContent: "left"
    }

    // Returned component.
    return (
        <div style={divStyle}>
            {
                loading ?
                    <CircularProgress />
                    :
                    <Container>
                        <>
                            {
                                isEndQuiz ?
                                    <div style={{
                                        display: 'flex', flexDirection: 'column', justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Typography
                                            variant="h4"
                                            className="score-section">
                                            Final Score: {score}/{questions?.length}
                                        </Typography>
                                        <div>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                onClick={() => history.push('/TriviaGame')}
                                                style={{ margin: 5 }}
                                            >
                                                Home
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                onClick={() => history.go(0)}
                                            >
                                                Play Again
                                            </Button>

                                        </div>

                                    </div>
                                    :
                                    <>
                                        <Typography variant="h5" className="question-section">
                                            <div style={divStyle} className="question-count">
                                                <span>Question {currentQuestion + 1}</span>/{questions?.length}
                                            </div>
                                            <div style={divStyle} className="question-text">
                                                {questions[currentQuestion]?.question}
                                            </div>
                                        </Typography>

                                        <div style={divStyle}>
                                            <Typography variant="h5" className="answer-section">

                                                <div style={optionStyle}>
                                                    {questions[currentQuestion]?.options.map((a, index) => (
                                                        <div style={buttonDivStyle}>
                                                            <p style={optionLetterStyle}>{String.fromCharCode(65 + index)}.</p>
                                                            <Button
                                                                style={buttonStyle}
                                                                variant="contained"
                                                                onClick={() => handleAnswerOptionClick(a.correct)}
                                                            >
                                                                {a.answer}
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>

                                            </Typography>
                                        </div>
                                    </>
                            }
                        </>
                    </Container>
            }
        </div >
    );
}
