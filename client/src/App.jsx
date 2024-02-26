import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle"
import Home from "./Components/home";
import StartPage from './Components/startPage'
import QuestionBox from './Components/questionBox';
import ProgressReport from "./Components/progressReport";
import PaymentGateway from "./Components/paymentGateway";
const App=()=> {
  return (
      <Router>
        <GlobalStyle/>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/startPage" element={<StartPage/>} />
          <Route path="/questionBox" element={<QuestionBox/>} />
          <Route path="/progressReport" element={<ProgressReport/>} />
          <Route path="/paymentGateway" element={<PaymentGateway/>} />
          </Routes>
      </Router>
  )
}

export default App
