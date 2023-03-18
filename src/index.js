import React from 'react';
import ReactDOM from 'react-dom/client'
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
import './styles/StyleComponent/dark.css'
import './styles/StyleComponent/base.css'
import './styles/StyleComponent/Modal.css'
import './styles/StyleComponent/kalender.css'
import './styles/StyleComponent/Modal.css'
import './styles/StyleComponent/Navbar.css'
import './styles/StyleComponent/bookCard.css'
import './styles/StyleComponent/page.css'
import './styles/StyleComponent/setting.css'
import './styles/StyleComponent/TodoApp.css'
import './styles/StyleComponent/notif.css'
import './styles/index.css'
import './styles/utils.css'
import './styles/StylePages/Auth.css'
import './styles/StylePages/Join.css'
import './styles/StylePages/App.css'


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