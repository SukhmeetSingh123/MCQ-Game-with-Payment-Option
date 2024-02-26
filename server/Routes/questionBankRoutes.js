const express = require('express');
const questionBankController=require('../Controller/questionBankController');
const router = express.Router();
    router.get('/fetchQuestions/:id',questionBankController.fetchQuestions);
    router.get('/fetchAllQuestions',questionBankController.fetchAllQuestions);
    router.post('/addQuestions',questionBankController.addQuestions);
module.exports = router;