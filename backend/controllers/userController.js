const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register = async(req,res) =>{
    try{
        const { fullName, username, password} = req.body;

        // Check if all fields are provided
        if (!fullName || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Check if the user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username already exists."
            });
        }

        // Hash the password
        const securePassword = await bcrypt.hash(password, 10);

        // Generate a profile photo URL
        const profilePhoto = `https://avatar.iran.liara.run/username?username=${fullName}`;

        // Create a new user instance
        const newUser = new User({
            fullName,
            username,
            password: securePassword,
            profilePhoto,
           
        });

        // Save the new user to the database
        await newUser.save();

        
      

        // Respond with success message and token
        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            
        });


    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const userExist = await User.findOne({ username });
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Wrong username or password!"
            });
        }

        // Compare passwords
        const comparePassword = await bcrypt.compare(password, userExist.password);
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: "Wrong username or password!"
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set the token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', 
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        // Respond with user details and success message
        res.status(200).json({
            success: true,
            message: "Login Successful.",
            user: {
                id: userExist._id,
                username: userExist.username,
                fullName: userExist.fullName,
                profilePhoto: userExist.profilePhoto
            }
        });

    } catch (error) {
        console.error("Error during login:", error); 
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}

const logout = async(req,res) =>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"Logout Successfull."
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
}


const getOtherUsers = async (req, res) => {
    try {
        const userId = req.id; // Assuming req.id is set correctly in a middleware

        const otherUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        if (otherUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found."
            });
        }

        res.status(200).json({
            success: true,
            otherUsers
        });

    } catch (error) {
        console.error("Error fetching other users:", error); // Log the error for debugging purposes
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}



module.exports = {
    register,
    login,
    logout,
    getOtherUsers
}