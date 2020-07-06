const Review = require('../models/review')
const Exp = require('../models/experience')


// exports.createReview  = catchAsync(async(req,res,next)=>{
//     const check = await Review.exists({
//         experience: req.params.eid,
//         user: req.user._id
//     })
//     if(check){
//         return next(new AppError(403," Already Reviewed"))
//     }
//     const review = await Review.create({
//         ...req.body,
//         experience: req.params.eid,
//         user: req.user._id,



//     })
// })


exports.createReview = async (req, res, next) => {
    try {
        const { experienceId, rating, content } = req.body
        if (!experienceId || !rating) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide all the data required to write your review"
            })
        };
        //use userID and findOne to find the experience
        let exp = await Exp.findOne({ _id: experienceId })
        if (!exp) {
            return res.status(401).json({
                status: "fail",
                error: "Experience Not Found"
            })
        };
        const reviewinDb = await Review.findOne({
            user: req.user._id,
            experience: experienceId
        })
        if (reviewinDb) {
            return res.status(400).json({
                status: "error",
                message: "Already given a review in this experience"
            })
        }
        const review = await Review.create(
            {
                user: req.user._id,
                content: content,
                rating: rating,
                experience: experienceId,
            })

        await review.populate({
            path: "user", select: "name"
        }).populate({ path: "experience", select: "title" }).execPopulate()
        res.status(201).json({ status: "Successfully Adding Review", data: review })

    } catch (err) {
        return res.status(401).json({
            status: "fail",
            error: "Please provide all the data required to create an experience"
        })
    }
}

exports.getReviewList = async (req, res) => {
    try {
        const reviewList = await Review.find({})
        res.status(200).json({
            status: "Success",
            data: reviewList
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })
    }


}

exports.deleteReview = async (req, res) => {
    try {
        
        const review = await Review.findByIdAndDelete(req.params.rid)
        res.status(200).json({
            status: "Successfully Deleting Your Review",
            data: review
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })


    }

}

exports.updateReview = async (req, res) => {
    try {
        const { content, rating } = req.body
        const review = await Review.findByIdAndUpdate(req.params.rid, {
            content: content,
            rating: rating,
        })
        res.status(200).json({
            status: "Successfully Editing Your Review",
            data: review
        })  
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })

    }

}