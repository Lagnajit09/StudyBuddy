import React from 'react';
import LandingPage from './LandingPage/LandingPage';
import { BrowserRouter } from "react-router-dom"; 

const App = () => {
  return (
    <>
     <BrowserRouter>
      <LandingPage/>
     </BrowserRouter>
    </>
  );
};

export default App;
