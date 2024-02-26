import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Store from './Redux/store.js'
import { Provider } from "react-redux";
// import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
