const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel');
require("dotenv").config();
const crypto=require("crypto")

async function processPayment (req, res) {
    try {

        const razorPay=new Razorpay ({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        })

        const options=req.body;
        const order=await razorPay.orders.create(options);
        if (!order) {
            return res.status(500).send("Error")
        }
        res.json(order);
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


async function paymentValidation (req, res) {
    try {
        const{razorpay_order_id,razorpay_payment_id,razorpay_signature,userId} =req.body
        const sha= crypto.createHmac("sha256",process.env.RAZORPAY_SECRET);
        sha.update(`${razorpay_order_id} | ${razorpay_payment_id}`);
        const digest=sha.digest("hex");
       
        // if(digest !== razorpay_signature){
        //     return res.status(400).json({msg:"Transaction is not legit!"})
        // }
        const payment = new Payment({
            userId,
            amount:1,
            transactionId: razorpay_payment_id,
            status: 'Completed'
        });
        await payment.save();

        res.json({
            msg:"success",
            orderId:razorpay_order_id,
            paymentId:razorpay_payment_id
        })
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    processPayment,
    paymentValidation
};
