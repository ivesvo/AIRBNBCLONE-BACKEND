const mongoose = require('mongoose');
// const { schema } = require('./experience');


const reviewSchema = mongoose.Schema({
   user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:[true, "username is required"]
    },

    content: {
        type: String,
        // required: [true, "please write something"],
        trim: true,
        maxLength: 1000,
        minLength: 100
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }, 
    experience:{
        type: mongoose.Schema.ObjectId,
        ref: "Exp",
        required: [true, "gotta belong to an experience"]

    }
    // {
    // timestamps: true
    
    
})

//middleware for postsave()

//calculate average
// schema.statics.calculateAverage = async function(eid){
//     //this refer to model
//     const stats = await this.aggegate([
//         {
//          $match: {experience: "$experience"}
//         },

//         {
//             $group: {
//             _id: "$experience",
//             nRating: {$sum: 1},
//             avgRating: {$avg:  "$rating"}
//         }
//     }
//     ])
//     await Exp.findByIdandUpdate

// }

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;