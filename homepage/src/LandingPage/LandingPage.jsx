import React from 'react';
import './LandingPage.css';
import TextHeader from './Components/TextHeader/TextHeader';
import MainImage from './Components/MainImage/MainImage';
import SocialPlatform from './Components/SocialPlatfom/SocialPlatform';
import MiddleText from './Components/MiddleText/MiddleText';
import Features from './Components/Features/Features';
import Testimonials from './Components/Testimonials/Testimonials';
import ReviewComponent from './Components/ReviewsComponents/ReviewComponent';
import FooterComponent from "./Components/Footer/FooterComponent";
function LandingPage() {
  return (
     <>
    {/* //  <NavBar>
    //     <h2>Study Buddy.</h2>
    //     <div className='navbar-middle'>
    //     <p>Courses</p>
    //     <p>Chat Room</p>
    //     <p>Notes</p>
    //     </div>
    //     <div className="buttons">
    //       <button id="login">Login</button>
    //       <button id="signup">Signup</button>
    //     </div>
    //   </NavBar> */}
      <TextHeader/> 
      <MainImage/>
      <SocialPlatform/>
      <MiddleText/>
      <Features/>
      <Testimonials/>
      <ReviewComponent/>
      <FooterComponent/>
      
    </>
  );
};

export default LandingPage;
