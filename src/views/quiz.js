import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Typography } from "@mui/material";

export default function Quiz(props) {
    // const questions = [
    //     {
    //         question: "What is the capital of France?",
    //         options: [
    //             { answer: "New York", correct: false },
    //             { answer: "London", correct: false },
    //             { answer: "Paris", correct: true },
    //             { answer: "Dublin", correct: false },
    //         ],
    //     },
    // ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isEndGame, setIsEndGame] = useState(false);
    const [score, setScore] = useState(0);
    const { ...rest } = props;
    const [id, setId] = useState(rest.match.params.id);
    const [questions, setQuestions] = useState([])

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setIsEndGame(true);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/question/game/' + id)
            .then(questions => {
                setQuestions(questions.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    return (
        <Container>

            <Typography className="score-section">
                score {score} out of {questions?.length}
            </Typography>

            {isEndGame ? null :
                <>
                    <Typography className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions?.length}
                        </div>
                        <div className="question-text">
                            {questions[currentQuestion]?.question}
                        </div>
                    </Typography>
                    <Typography className="answer-section">
                        {questions[currentQuestion]?.options.map((a) => (
                            <Button
                                variant="contained"
                                onClick={() => handleAnswerOptionClick(a.correct)}
                            >
                                {a.answer}
                            </Button>
                        ))}
                    </Typography>
                </>
            }
        </Container>
    );
}
