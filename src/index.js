import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import './component/style/dark.css'
// import './component/style/light.css'
import App from './pages/App'
import { Auth, Register, Login, Pemulihan } from './pages/Auth'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import store from './redux/store'
import { Provider } from 'react-redux';
import Join from './pages/Join'

// import all css
import 'react-toastify/dist/ReactToastify.css';
import './component/style/base.css'
import './component/style/Modal.css'
import './component/style/kalender.css'
import './component/style/Modal.css'
import './component/style/Navbar.css'
import './component/style/bookCard.css'
import './component/style/page.css'
import './component/style/setting.css'
import './component/style/TodoApp.css'
import './component/style/notif.css'
import './pages/Auth.css'
import './pages/Join.css'
import './pages/App.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* <React.StrictMode> */}
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path='*' element={<App />}/>
        <Route path='/auth'>
          <Route index element={<Auth />}/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='pemulihan' element={<Pemulihan />}/>
        </Route>
        <Route path='/join' element={<Join />}/>
      </Routes>
      </Provider>
    </BrowserRouter>
    <ToastContainer
              pauseOnFocusLoss={false}
              theme="colored"
              autoClose={1000}
              position="top-center"
              closeButton={false}
    />
  {/* </React.StrictMode> */}
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();