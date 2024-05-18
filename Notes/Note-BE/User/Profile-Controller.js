const User= require('./userModel')

//1.    Function to view User Profile
const viewProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId);
        return res.status(200).json({user:user})
    }
    catch (error) {
        return res.status(500).json({message:"error viewing user profile"})
    }
}

//2.    User to Update user Profile
//To be updated soon......