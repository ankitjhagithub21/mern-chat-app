const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const register = async(req,res) =>{
    try{
        const { fullName, username, password} = req.body;

        if (!fullName || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const user = await User.findOne({ username });
        
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username already exists."
            });
        }

       
        const securePassword = await bcrypt.hash(password, 10);      

        const newUser = new User({
            fullName,
            username,
            password: securePassword,
           
        });

      
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            
        });


    }catch(error){
       
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const userExist = await User.findOne({ username });
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Wrong username or password!"
            });
        }

       
        const comparePassword = await bcrypt.compare(password, userExist.password);
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: "Wrong username or password!"
            });
        }

        
        const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none', 
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        
        res.status(200).json({
            success: true,
            message: "Login Successful.",
        });

    } catch (error) {
     
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
        const userId = req.id; 

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
        console.error("Error fetching other users:", error); 
        res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
}


const getCurrUser = async(req,res) =>{
    try{
        const userId = req.id;

        if(!userId){
            return res.status(401).json({
                success:false,
                message:"You are not authorized."
            })
        }
        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(401).json({
                success:false,
                message:"You are not authorized."
            })
        }
        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
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
    getOtherUsers,
    getCurrUser
    
}