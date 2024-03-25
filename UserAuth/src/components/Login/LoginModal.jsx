import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import Email_icon from '../../assets/Email_icon.svg'
import Password_icon from '../../assets/Password_icon.svg'
import './LoginModal.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
const LoginModal=()=>{

    // const[enteredEmail,setEnteredEmail]=useState('');
    // const[enteredPassword,setEnteredPassword]=useState('');
    // const[isValid,setIsValid]=useState(false);

    // const loginHandler=(event)=>{
    //     event.preventDefault();
    //     if(enteredEmail.includes('@') && enteredEmail.includes('.') && enteredPassword.length>6){
    //         setIsValid(true);
    //     }
    //     else{
    //         alert('Invalid');
    //     }

    //     if(isValid){

    //     }
        
    // }

    // const emailHandler=(event)=>{
    //     setEnteredEmail(event.target.value);
    // }

    // const passwordHandler=(event)=>{
    //     setEnteredPassword(event.target.value);
    // }
    return(
        <div className='Login-Modal-container'>
            <div className='login'>
                <span id='login-span'>Log in</span>
                <div className='login-socials'>
                    <button className='social-btn' ><FaFacebookF style={{backgroundColor:"transparent",fontSize:"20px",marginTop:"2px"}}/></button>
                    <button className='social-btn'><FaGoogle style={{backgroundColor:"transparent",fontSize:"20px",marginTop:"2px"}}/></button>
                    <button className='social-btn'><FaLinkedinIn style={{backgroundColor:"transparent",fontSize:"20px",marginTop:"2px"}}/></button>
                </div>
                <span id='option-span'>or use your email account:</span>
                <form>
                    <div className='email-input'>
                        <img src={Email_icon}/>
                        <input type='text' placeholder='Email'  />
                    </div>
                    <div className='pwd-input'>
                        <img src={Password_icon}/>
                        <input type='password' placeholder='Password'  />
                    </div>                    
                </form>
                <span id='forgot-pwd'>Forgot your password?</span>
                <button type="submit" className='login-btn' >Login</button>
            </div>
            <div className='to-signup'>
                <div className='welcome-1'>
                    <span>Welcome back To</span>
                    <span>Study Buddy!</span>
                </div>
                
                <span id='welcome-2'>New Here?</span>
                <Link to ={"/signup"} style={{backgroundColor:"transparent"}}>
                    <button type="submit" className='signup-btn'>Signup</button>
                </Link>
                
            </div>
        </div>
    )
}

export default LoginModal;