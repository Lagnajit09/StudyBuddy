import React from 'react';
import './App.css'
import LoginModal from './components/Login/LoginModal'
import SignupModal from './components/Signup/SignupModal'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginModal/>}/>
      <Route path='/signup' element={<SignupModal/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
