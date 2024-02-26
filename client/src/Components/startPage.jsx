import React, { useEffect } from 'react'
import styled from "styled-components";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
    const navigate=useNavigate();
    const userId=localStorage.getItem("userId")

    useEffect(()=>{
        if(!userId){
            navigate('/');
        }
    },[])
    const handleNavigation = async () => {
        navigate('/questionBox')
    };
    return (
        <Wrapper>
            <h1 className="heading text-center">Start Quiz...</h1>
            <hr />
            <h3 className=" text-center">UserId: {userId}</h3>
            <div className='grid grid-two-column'>
                <div style={{margin:'1rem'}}>
                    <h3 className='heading2'>Rules...</h3>
                    <ul>
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
                    </ul>
                </div>
                <div style={{margin:'1rem'}}>
                    <h3 className='heading2'>Important Notes:</h3>
                    <ul>
                        <li>
                            Each question will have a time limit of 30 seconds. Please make sure to answer within this time frame.
                        </li>
                        <li>
                            You have the flexibility to submit your answers at any time during the quiz. There's no need to wait until the end.
                        </li>
                        <li>
                            Once you submit your answers, you won't be able to change them, so review your responses carefully before submission.
                        </li>
                        <li>
                            If you run out of time for a question, it will be automatically skipped, so manage your time wisely.
                        </li>
                        <li>
                            Good luck, and enjoy the quiz!
                        </li>
                    </ul>
                </div>


            </div>
            <div className="buttonStyle text-center">
                <Button variant="success" onClick={handleNavigation} style={{ width: '8rem' }}>
                    START...
                </Button>
            </div>

        </Wrapper>
    )
}

export default StartPage
const Wrapper = styled.section`
.heading {
  font-size: 3rem;
  text-decoration: underline;
  margin-top:2rem;
}
.heading2{
  display:flex;
  justify-content:center;
}
.dropDown{
  display:flex;
  justify-content:center;
  align-items:center;
}
@media (max-width: 750px) {
 
  .heading {
    font-size: 2rem;
  };
  .grid{
    gap:2rem;
  }
  .grid-two-column{
    grid-template-columns: 1fr;
  }
}
`
