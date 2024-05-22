import './SignupModal.css';
import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from 'react';
import {emailHandler,passwordHandler,confirmPasswordHandler, nameHandler} from '../../validation';

const SignupModal=()=>{

    const[enteredEmail,setEnteredEmail]=useState('');
    const[enteredPassword,setEnteredPassword]=useState('');
    const[enteredConfirmPassword,setEnteredConfirmPassword]=useState('');
    const[enteredFirstName,setEnteredFirstName]=useState('');
    const[enteredLastName,setEnteredLastName]=useState('');
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
                        <input type='text' className='firstname' placeholder='First name' required onBlur={()=>{nameHandler(enteredFirstName,'firstname','fname-invalid','input-error')}} onChange={(e)=>{setEnteredFirstName(e.target.value)}}/>
                        <span className='fname-invalid'>First name is required.</span>
                        <input type='text' className='lastname' placeholder='Last name' required onBlur={()=>{nameHandler(enteredLastName,'lastname','lname-invalid','input-error')}} onChange={(e)=>{setEnteredLastName(e.target.value)}} />
                        <span className='lname-invalid'>Last name is required.</span>
                        <input type='text' className='s-email-input'placeholder='Email' onBlur={()=>{emailHandler(enteredEmail,'s-email-input','s-email-invalid','input-error')}} onChange={(e)=>{setEnteredEmail(e.target.value)}} required />
                        <span className='s-email-invalid'>Email must contain a '@' and a '.'</span>
                        <input type='password' className='cpwd-input'placeholder='Password' onBlur={()=>{passwordHandler(enteredPassword,'cpwd-input','s-pass-invalid','input-error')}} onChange={(e)=>{setEnteredPassword(e.target.value)}} required  />
                        <span className='s-pass-invalid'>Password should have atleast 6 characters.</span>
                        <input type='password'className='cpwd-input' placeholder='Confirm Password' onBlur={()=>{confirmPasswordHandler(enteredPassword,enteredConfirmPassword,'cpwd-input','cpass-invalid','input-error')}} onChange={(e)=>{setEnteredConfirmPassword(e.target.value)}} required />
                        <span className='cpass-invalid'>Confirm password should be same as Password.</span>
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