import React from 'react';
import './FooterComponent.css';
import FooterButton from "../Footer/FooterButton/FooterButton";
import FooterImg from "../../../Assets/Images/Footer-images/footer_img.svg";

function FooterComponent() {
  
  return (
    <div className='footer-div'>
        <div className='footer-img-div'>
         <FooterButton/>
         <img src= {FooterImg} alt='footer-img' className='footer-img'/>
        </div>
      {/* <FooterText/> */}
    </div>
  );
};

export default FooterComponent;

