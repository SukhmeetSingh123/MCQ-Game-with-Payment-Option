import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment ,paymentValidation} from "../Redux/Payment/paymentRedux"
import {updateUser,fetchUser} from "../Redux/User/userRedux"
import { useNavigate } from 'react-router-dom';
const PaymentGateway = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const { userData } = useSelector(state => state.user);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
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

    

    const handlePayment =async (e) => {
        e.preventDefault();
        const paymentValue={
            amount:100,
            currency:"INR",
            receipt:"djnjd"
        }
        const paymentDetail= await dispatch(processPayment(paymentValue));
        var options = {
            "key": "rzp_test_Yow8xPeqDsr5Ca", 
            "amount": paymentValue.amount,
            "currency": paymentValue.currency,
            "name": "Sukhmeet Singh",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": paymentDetail.payload.id,
            "handler": async function (response){
    
                const validationDetails = await dispatch(paymentValidation({ responseData: response, userId: currentLoggedInUser._id }));
                if (validationDetails.payload.orderId) {
                    dispatch(updateUser({userId: currentLoggedInUser._id, paymentStatus:"Completed"}));
                    navigate("/progressReport")
                }
            },
            "prefill": {
                "name": "Sukhmeet Singh",
                "email": "sukhmeetsingh1122002@gmail.com",
                "contact": "9116290699"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      
    };
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '50px' }}>
            <h2>Process Payment to See Your Quiz Result</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5rem" }}>

                <Button variant="primary" onClick={handlePayment}>
                    Pay
                </Button>
            </div>
        </div>
    );
};

export default PaymentGateway;
