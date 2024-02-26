import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuestions } from "../Redux/QuestionBank/questionBankRedux";
import { fetchUser } from "../Redux/User/userRedux";
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
const ProgressReport = () => {
    const navigate=useNavigate()
    const userId = localStorage.getItem("userId");
    const { userData } = useSelector(state => state.user);
    const { allQuestions } = useSelector(state => state.questionBox);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState([]);
    const [report, setReport] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!userId) {
            navigate('/');
        } else {
            dispatch(fetchUser(userId))
            dispatch(fetchAllQuestions())
        }
    }, []);
    useEffect(() => {
        return () => {
            if (Chart.helpers && Chart.helpers.each) {
                Chart.helpers.each(Chart.instances, (instance) => {
                    instance.destroy();
                });
            }
        };
    }, [dispatch]);
    useEffect(() => {
        if (userData && allQuestions) {
            const userDetail=userData.find(user=>user.userId === userId);
            const newReport = userDetail?.quizAnswer.map(answer => {
                const question = allQuestions?.find(q => q._id === answer.questionId);
                let isCorrect = null;

                if (question && answer.selectedAnswer !== null) {
                    isCorrect = question.correctAnswer === answer.selectedAnswer;
                }

                return {
                    ...answer,
                    questionText: question?.question,
                    correctAnswer: question?.correctAnswer,
                    isCorrect
                };
            });
            setReport(newReport);
        }
    }, [userData, allQuestions]);


    const correctAnswers = report?.filter(entry => entry.isCorrect).length;
    const incorrectAnswers = report?.filter(entry => !entry.isCorrect && entry.selectedAnswer).length;
    const notAttempted = report?.filter(entry => !entry.selectedAnswer).length;

    const data = {
        labels: ['Correct', 'Incorrect', 'Not Attempted'],
        datasets: [{
            data: [correctAnswers, incorrectAnswers, notAttempted],
            backgroundColor: ['#7fffd4', '#b4ff7f', '#7fabff'],
        }],
    };

    const options = {
        responsive: true,
    };

    return (
        <Container>
            <StyledCard>
                <PieWrapper>
                    <Pie data={data} options={options} />
                </PieWrapper>
                <ScoreCard>
                    <ScoreItem>
                        Correct: {correctAnswers}
                    </ScoreItem>
                    <ScoreItem>
                        Incorrect: {incorrectAnswers}
                    </ScoreItem>
                    <ScoreItem>
                        Not Attempted: {notAttempted}
                    </ScoreItem>
                </ScoreCard>
            </StyledCard>
            <QuestionCardsContainer>
                {report?.map((entry, index) => (
                    <QuestionCard style={{ fontFamily: "monospace" }} key={index} className={entry.selectedAnswer ? (entry.isCorrect ? "correct" : "incorrect") : "not-attempted"}>
                        <Card.Body>
                            <Card.Title>Question {index + 1}</Card.Title>
                            <Card.Text>
                                <strong>Question:</strong> {entry.questionText}
                            </Card.Text>
                            <Card.Text>
                                <strong>Selected Answer:</strong> {entry.selectedAnswer || 'Not Attempted'}
                            </Card.Text>
                            <Card.Text>
                                <strong>Correct Answer:</strong> {entry.correctAnswer}
                            </Card.Text>
                            <Card.Text style={{ color: entry.isCorrect === true ? 'green' : entry.isCorrect === false ? 'red' : '#4100ff' }}>
                                <strong>Result:</strong> {entry.isCorrect === true ? 'Correct' : entry.isCorrect === false ? 'Incorrect' : 'Not Attempted'}
                            </Card.Text>


                        </Card.Body>
                    </QuestionCard>
                ))}
            </QuestionCardsContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledCard = styled(Card)`
    width: 50%;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    padding: 20px;
`;

const PieWrapper = styled.div`
    width: 50%;
`;

const ScoreCard = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ScoreItem = styled.p`
    margin: 5px 0;
`;

const QuestionCardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const QuestionCard = styled(Card)`
    width: 50rem;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default ProgressReport;
