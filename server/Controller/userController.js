const userModel = require('../Models/userModel');

const fetchUserDetail = async (req, res) => {
    try {
        const user = await userModel.find();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const addUserDetail = async (req, res) => {
    try {
        const existingUserDetail = await userModel.findOne({ userId: req.body.userId });
        if (existingUserDetail) {
            res.status(400).json({ message: "User detail already exists." });
        } else {
            const newUserDetail = new userModel(req.body);
            const savedUserDetail = await newUserDetail.save();
            res.status(201).json(savedUserDetail); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
const updateUserDetail = async (req, res) => {
    try {
        const userId  = req.params.id;
        const { quizAnswer, doneQuestionCount, paymentStatus } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (quizAnswer && quizAnswer.length > 0) {
            user.quizAnswer.push(...quizAnswer);
            user.doneQuestionCount =user.doneQuestionCount+ quizAnswer.length;
        }

        if (paymentStatus) {
            user.paymentStatus = paymentStatus;
        }
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    fetchUserDetail,
    addUserDetail,
    updateUserDetail
}