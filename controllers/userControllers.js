const User = require("../models/user");


exports.createUser = async (req, res) => {

    try {
        const { email, name, password, role } = req.body;
        if (!email || !name || !password || !role) {
            return res.status(400).json({
                status: "fail",
                error: "email, name, password and role of user is required"
            });


        }
        const user = await User.create({ email: email, password: password, name: name, role: role || "normal" })
        res.status(201).json({ status: "OK", data: user})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })


    }
}

exports.getUsers = async (req,res) =>{
    try{
        const userList = await User.find({})
            res.status(200).json({
                status: "Success",
                data: userList
            })

    } catch (err){
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })
    }
}

exports.getMyProfile = async (req, res) => {
    res.json({ status: "ok", data: req.user })
}

// exports.getUsersbyID = async (req,res) =>{

// }

// exports.updateUser = async (req,res,next)=>{
//     try{

//     } catch (err){

//     }
// }