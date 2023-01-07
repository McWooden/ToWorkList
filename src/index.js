import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './pages/App'
import { Auth, Register, Login } from './pages/Auth'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App />}/>
        <Route path='/auth'>
          <Route index element={<Auth />}/>
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/register' element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer
              pauseOnFocusLoss={false}
              theme="colored"
              autoClose={1000}
              position="top-left"
    />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();