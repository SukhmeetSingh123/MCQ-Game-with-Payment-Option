import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk';
import {questionBankReducer} from './QuestionBank/questionBankRedux'
import {userReducer} from './User/userRedux'
import {paymentReducer} from './Payment/paymentRedux'
const Store = configureStore({
    reducer: {
        questionBox:questionBankReducer,
        user:userReducer,
        paymentProcess:paymentReducer
    },
    // middleware: [thunk],
})


export default Store;