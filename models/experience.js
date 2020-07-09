const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
        minLength: 5,
        maxLength: 140,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
        maxLength: 1000,
        minLength: 130,
    },
    duration:{
        type: Number,
        // required:[ true, "duration is required"]

    },
    groupsize:{
        type: Number,
        // require:[true, "groupsize is required"]

    },
    pictureURL:[{
        type: String,
        // require:[true, "photos are required"]
    }],
    // host: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    rating:{
        type: Number,
        default: 0, 
        min: 0,
        max: 5

    },
    nRating:{
        type: Number,
        default: 0, 
       
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: [true, "Please choose a tag for this experience"]
    
    }],
    price:{
        type:  Number,
        required: true,
    },
    items:[{
        type: String,
        required: [true, "Please provide what to bring for this experience"]
    }],
    language:{
        type: String,
    },
    hostname:{
        type: String,
        required: true,
    },
    hostpictureURL:{
        type: String,
    },
    country:{
        type: String,
       
    }},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// schema.statics.convertToObject = async function (arr){
//     let arr = [...this.tag] // array of strings
//     //change arr to arr of objectid
//     //find the tag from each string from Tag model
//     let foo = arr.map(async e => await Tag.findOne({tag:e.toLowerCase().trim()}))
//     let result = Promise.all(foo)

// }

// schema.pre("save", async function (next) {
//     let arr = [...this.tag] // array of strings
//     //change arr to arr of objectid
//     //find the tag from each string from Tag model
//     let foo = arr.map(async e => await Tag.findOne({tag:e.toLowerCase().trim()}))
//     let result = Promise.all(foo)
//     this.tag = result

//     next()
// })


module.exports = mongoose.model("Exp", expSchema)
