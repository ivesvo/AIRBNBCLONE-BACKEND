const Exp = require('../models/experience')
const Tag = require('../models/tag')
const {catchAsync} = require('./errorController')
const AppError = require('../utils/appError')
const PAGE_SIZE = 8

// exports.getExp = async (req, res, next) => { //getExperience by ID 
//     try {

//     } catch (err) {

//     }

    exports.getExps = catchAsync( async (req, res, next) => { //get all experiences 
        // try {
            const pageNum = req.query.page || 1;
            const minPrice = req.query.minPrice || 1;
            const maxPrice = req.query.maxPrice || 1000
            const numToSkip = (parseInt(pageNum)-1)*PAGE_SIZE
            const expList = await Exp.find({}).sort({createdAt:-1}).limit(PAGE_SIZE).skip(numToSkip);
            const numDocuments = await Exp.countDocuments();
            res.status(200).json({
                status: "Success",
                data: expList,
                maxPageNum: Math.ceil(numDocuments/PAGE_SIZE)
            })

        // } catch (err) {
        //     console.log(err)
        //     res.status(401).json({
        //         status: "fail",
        //         message: err.message
        //     })

        })

    exports.createExp = catchAsync (async (req, res, next) => {
       
            const user = req.user
            const { title, description, tags, price } = req.body
            if (!title || !description || !tags) {
                next(new AppError, 401, "please provide all the data required to create an experience")
               
            };
            const newArr = await Tag.convertToObject(tags)
            //tag rightnow is an array of string
            // --> convert to an arrat of objectIDs
            // ig tag exists in tags collcction, then we will use the associate id as objecID
            // else, we need to create that tag document in the collection first, then return the id

            const exp = await Exp.create(
                {
                    title: title,
                    description: description,
                    price: price,
                    // groupsize,
                    // duration,
                    // images,
                    tags: newArr,
                    // host: user._id
                });
            await exp.populate({path:"host", select:"name"}).execPopulate()
            res.status(201).json({ status: "OK", data: exp })

        // } catch (err) {
        //     console.log(err)
        //     res.send("error in creating experience bro")
        // }

    })

    exports.updateExp= async (req, res, next) => {
        try {
            const {title,description,duration,groupsize,tags,host} = req.body
            const user = req.user
            const exp = await Exp.findByIdAndUpdate(req.params.eid, {
                title: title,
                description: description,
                duration: duration,
                groupsize: groupsize,
                tags: tags
            })
            if(!exp){ 
                next(new AppError(400, "Undefined Experience") )}
            if(user._id !== host){
                next(new AppError(401, "You cannot"))}
            res.status(200).json({
                status: "Successfully Editinçg Your Experience",
                data: exp
            })  
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: "error", error: err.message })
    
        }
    
    }


exports.deleteExp = async (req, res) => {
    try {
        
        const exp = await Exp.findByIdAndDelete(req.params.eid)
        res.status(200).json({
            status: "Successfully Deleting Your Experience",
            data: exp
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })


    }

}

exports.getExperienceId = async (req,res)=>{
    const id = req.params.eid
   
    const exp = await Exp.findById(id)
    console.log(exp)
    res.status(200).json({
        status: "Successful",
        data: exp
    })
}