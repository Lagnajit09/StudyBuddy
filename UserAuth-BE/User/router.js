//THIS FILE CONTAINS THE ROUTERS

const express=require('express')

const router=express.Router()
const auth=require("./auth-Controller")

const signupSchema= require("./signup-Schema")
const validate=require("./validate-signup")

router.route('/signup').post(validate(signupSchema),auth.signup)  //route to signup page //Validation to be added
router.route('/login').post(auth.login)  //route to handle login page

module.exports = router


