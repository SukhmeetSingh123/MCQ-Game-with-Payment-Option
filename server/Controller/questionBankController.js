const questionBankModel=require('../Models/questionBankModel');
const userModel=require('../Models/userModel')


const fetchQuestions = async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        const doneQuestionCount = user.doneQuestionCount;
        const questions = await questionBankModel.find().skip(doneQuestionCount).limit(0);
        res.json(questions);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
const fetchAllQuestions = async (req, res) => {
    try {
        const questions = await questionBankModel.find();
        res.json(questions);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


const addQuestions = async (req, res) => {
    try {
        const questionData = req.body; 
        const newQuestion = new questionBankModel(questionData);
        await newQuestion.save();
        res.status(201).json({ message: "Question added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports={
    fetchQuestions,
    fetchAllQuestions,
    addQuestions,
}