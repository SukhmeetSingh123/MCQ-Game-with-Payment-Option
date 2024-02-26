import React, { useEffect, useState } from 'react';
import { fetchQuestions } from "../Redux/QuestionBank/questionBankRedux";
import { fetchUser, updateUser } from "../Redux/User/userRedux";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';


const QuestionBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { userData } = useSelector(state => state.user);
  const { questions } = useSelector(state => state.questionBox);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [userAnswers, setUserAnswers] = useState([]);
  const [lastSelectedAnswer, setLastSelectedAnswer] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        navigate('/');
      } else {
        await dispatch(fetchUser(userId));
      }
    };

    fetchData();
  }, [userId]);



  useEffect(() => {
    if (Array.isArray(userData) && userId) {
      const user = userData.find(user => user.userId === userId);
      setCurrentLoggedInUser(user);
    }
  }, [userData]);



  useEffect(() => {
    if (currentLoggedInUser) {
      dispatch(fetchQuestions(currentLoggedInUser._id));
    }
  }, [currentLoggedInUser]);


  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        if (currentQuestionIndex < questions.length - 1) {
          handleNextQuestion()
          setTimer(30);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, currentQuestionIndex, questions.length]);



  const handleNextQuestion = () => {
    setUserAnswers(prevAnswers => [
      ...prevAnswers,
      {
        questionId: questions[currentQuestionIndex]._id,
        selectedAnswer: null
      }
    ]);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setTimer(30);
  };


  const getOptionsArray = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const options = [];

    for (let i = 1; i <= 4; i++) {
      const optionKey = `option${i}`;
      if (currentQuestion.hasOwnProperty(optionKey)) {
        options.push(currentQuestion[optionKey]);
      }
    }

    return options;
  };



  const handleOptionChange = (optionId) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex]._id,
      selectedAnswer: optionId
    };
    setUserAnswers(updatedUserAnswers);
  };


  const handleSubmit = () => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex]._id,
      selectedAnswer: lastSelectedAnswer
    };
    setUserAnswers(updatedUserAnswers);
    const quizAnswers = userAnswers.map(answer => ({
      questionId: answer.questionId,
      selectedAnswer: answer.selectedAnswer

    }));
    dispatch(updateUser({ userId: currentLoggedInUser._id, quizAnswer: quizAnswers }));
    if (currentLoggedInUser.paymentStatus=="Completed") {
      navigate('/progressReport')
    }else{
      navigate('/paymentGateway')

    }
  };
  
  const handleNavigation=()=>{
    if (currentLoggedInUser.paymentStatus=="Completed") {
      navigate('/progressReport')
    }else{
      navigate('/paymentGateway')

    }
  }


  return (
    <Container className="mt-3">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <Row>
          <Row className="justify-content-end">
            <Col xs="auto">
              <Badge variant="secondary">{timer} sec</Badge>
            </Col>
          </Row>
          <Col xs={12} md={12} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>
                </Card.Title>
                <Card.Text>{questions[currentQuestionIndex].question}</Card.Text>
                <ul>
                  {getOptionsArray().map((option, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${currentQuestionIndex}`}
                          value={option}
                          checked={userAnswers[currentQuestionIndex]?.selectedAnswer === option}
                          onChange={() => {
                            handleOptionChange(option);
                            setLastSelectedAnswer(option);
                          }}

                        />
                        {option}
                      </label>
                    </div>
                  ))}

                </ul>
              </Card.Body>
            </Card>
          </Col>
          <div>

            <Col xs={12} md={4}>
              <StyledButton onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                Next Question
              </StyledButton>

              <StyledButton onClick={handleSubmit} variant="success">
                Submit
              </StyledButton>
            </Col>
          </div>
        </Row>
      ) : (
        <div>
          <p>No more questions available. More questions coming soon!</p>
          <StyledButton onClick={handleNavigation} variant="success">
                Check ProgresReport
              </StyledButton>
        </div>
      )}
    </Container>
  );
};

const StyledButton = styled(Button)`
  margin: 0.5rem;
`;

export default QuestionBox;
