import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Typography } from "@mui/material";

// Component for a Quiz. Has states for current question in the quiz, a boolean for 
// if a quiz (game) is over, quiz score, quiz id, and a list of all quiz questions.
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
    const [isEndQuiz, setIsEndQuiz] = useState(false);
    const [score, setScore] = useState(0);
    const { ...rest } = props;
    const [id, setId] = useState(rest.match.params.id);
    const [questions, setQuestions] = useState([])

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
        axios.get('http://localhost:5000/api/question/game/' + id)
            .then(questions => {
                setQuestions(questions.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Returned component.
    return (
        <Container>
            <Typography className="score-section">
                score {score} out of {questions?.length}
            </Typography>
            {isEndQuiz ? null :
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
