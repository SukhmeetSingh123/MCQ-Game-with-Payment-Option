const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    quizAnswer: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionBank"
        },
        selectedAnswer: {
            type: String,
        }
    }],
    doneQuestionCount:{
        type:Number,
        default :0,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', userSchema)