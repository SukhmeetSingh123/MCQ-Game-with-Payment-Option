const connectToMongoose = require('./db');
var cors=require('cors');
const express =require('express');
connectToMongoose();

const app=express();
const port =5000;

app.use(cors());
app.use(express.json());

app.use('/api/user',require('./Routes/userRoutes'));
app.use('/api/payment',require('./Routes/paymentRoutes'));
app.use('/api/questionBank',require('./Routes/questionBankRoutes'));

app.listen(port,()=>{
    console.log(`MCQ Game Backened listening on port ${port} `);
})
