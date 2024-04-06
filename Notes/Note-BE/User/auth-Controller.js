//THIS FILE CONTAINS 2 FUNCTION TO CONTROL THE SIGNUPO AND LOGIN 

const User=require('./userModel')
const bcrypt = require('bcryptjs')




//SIGNUP FUNCTION
exports.signup =async(req,res) => {
    try{
        const{firstname,lastname,username, email, password} = req.body;    //get data from frontend
        const mailExist = await User.findOne({email:email})    //Find id the email already exisit
        const userExist = await User.findOne({username:username})
        if(mailExist){        //If email exisits 
            return res.status(400).json('email already exist')
        }
        if (userExist) {
                return res.status(400).json('username already exist')
        }
        
        //else create a new user in the DB
        const userCreated= await User.create({    
            firstname,
            lastname,
            username, 
            email, 
            password,
        })

        //Send mag, JWT token to user
        res.status(200).json({      
            msg:userCreated,    //can show a message too
            token: await userCreated.generateToken(),    //must send
            userId: userCreated._id    //optional
        })
    }
    catch(error){    //Handle interal error
        console.log(error)
        res.status(500).json('Error Bro')
    }
}


//LOGIN FUNTION
exports.login =async(req, res) => {
    try{
        const {email, password}=req.body    //get data from the login page
        const userExist = await User.findOne({email})    //check if user already esist in DB 

        if(!userExist){    //if doesnt exist 
            return res.status(400).json('Email doesnt exist') //email id not found
        }

        //else compare password 
        const user = await bcrypt.compare(password, userExist.password)    //true if matched
        if(user){  //If matched  
            res.status(200).json({
                msg:"Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        }
        else{    //If not matched
            res.status(400).json({message:'Invalid password'})
        }
    }
    catch(error){    //Handle internal error
        console.log(error)
        res.status(500).json('Error Bro')
    }
}

