import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, fetchUser } from "../Redux/User/userRedux"
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
 
    useEffect(() => {
        localStorage.clear();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser(inputValue));
        localStorage.setItem('userId', inputValue);
        navigate('/startPage');
    };


    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <Wrapper className="container">
            <h1 className="heading text-center">MCQ Quiz Game</h1>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <ul>
                        <h2>Introduction</h2>
                        <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, nemo.
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
                        </li>
                        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo quisquam?

                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo consectetur quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo quisquam?
                        </li>
                        <li>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, aliquam eaque nostrum tenetur iusto eos cumque sequi illo quisquam?
                        </li>
                    </ul>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formInput">
                            <Form.Label
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "1rem",
                                    fontSize: "1.5rem"
                                }}>Enter UserId / UserName</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your UserId"
                                value={inputValue}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "1rem",
                            }}
                        >
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Wrapper>
    );
};

export default Home
const Wrapper = styled.section`
  .heading {
    font-size: 3rem;
    text-decoration: underline;
  }

  li {
    margin-top: 1rem;
  }
  @media (max-width: 750px) {
 
    .heading {
      font-size: 2rem;
    }
  }

`;