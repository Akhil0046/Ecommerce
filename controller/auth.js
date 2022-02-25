
const {Register,Login} = require('../model/authModel');

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')


const register = async (req, res, next)=>{
    try {
        const{
            fullname,
            password,
            email,
            role
        }=req.body;

        const user = await Register.findOne({
            email: email
        })

        if (!user) {
            const salt = bcryptjs.genSaltSync(10);
            console.log(salt,"salt");
            const encryptedPassword = bcryptjs.hashSync(password, salt)
            const newUser = await Register.insertMany({
                fullname,
                password:encryptedPassword,
                email,
                role
            })
            // const token = jwt.sign({
            //         _id: newUser.email
            //     },process.env.jwtSecret )
            res.status(200).json({
                error: false,
                // token: token,
                message:"User Registered Successfully",
                response: newUser
            })
        }else {
            res.status(400).json({
                error: false,
                message:"User already Exist ",
            })
        }
        
    }catch (err) {
                next(err.message)
            }
}



const login = async (req, res, next)=>{
    try {
        const{
            email,
            password
        }=req.body;

        const user = await Register.findOne({
            email: email
        })

        if (user) {
           if (bcryptjs.compareSync(password, user.password)) {
            const token = jwt.sign({
                _id: newUser.email
            }, process.env.jwtSecret);

            res.status(200).json({
                error: false,
                token:token,
                message:"User Login Successfully",
                response: newUser
            })
           }else{
            res.status(400).json({
                error: false,
                message:"Password is incorrect ",
            })
           }
        }else {
            res.status(400).json({
                error: false,
                message:"User Does not Exist ",
            })
        }
        
    }catch (err) {
                next(err.message)
            }
}




module.exports={
    register,
    login
}