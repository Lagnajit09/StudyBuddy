import './SignupModal.css';
import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignupModal=()=>{
    return(
        <div className='Signup-Modal-container'>
            <div className='signup'>
                <span id='signup-span'>Create Account</span>
                <div className='signup-socials'>
                    <button className='social-btn' ><FaFacebookF style={{backgroundColor:"transparent",fontSize:"20px",marginTop:"2px"}}/></button>
                    <button className='social-btn'><FaGoogle style={{backgroundColor:"transparent",fontSize:"20px",marginTop:"2px"}}/></button>
                    <button className='social-btn'><FaLinkedinIn style={{backgroundColor:"transparent",fontSize:"20px",marginTop:"2px"}}/></button>
                </div>
                <form>
                    <div className='signup-form-div'>
                        <input type='text' placeholder='First name'  />
                        <input type='text' placeholder='Last name'  />
                        <input type='text' placeholder='Email' />
                        <input type='password' placeholder='Password'  />
                    </div>
                                          
                </form>
                <button type="submit" className='signup-btn' >Signup</button>
            </div>
            <div className='to-login'>
                <div className='welcome-1'>
                    <span>Welcome To</span>
                    <span>Study Buddy!</span>
                </div>
                
                <span id='welcome-2'>Already have an account?</span>
                <Link to="/login" style={{backgroundColor:"transparent"}}>
                    <button type="submit" className='login-btn'>Login</button>
                </Link>
                
            </div>
        </div>
    );
}

export default SignupModal;