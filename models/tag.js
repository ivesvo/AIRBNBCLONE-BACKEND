const mongoose = require('mongoose')


const tagSchema = new mongoose.Schema({
    tag:{
        type: String,
        required: [true, "tag is required"],
        unique: true,
        trim: true,
        lowercase: true
    }
})


tagSchema.statics.convertToObject = async function (arr){
    // let arr = [...this.tag] // array of strings
    //change arr to arr of objectid
    //find the tag from each string from Tag model
    let foo = arr.map(async e => {
        let tag = await Tag.findOne({tag:e.toLowerCase().trim()})
        if(tag)
        return tag
    tag = await this.create({tag: e.toLowerCase().trim()})
    let result = Promise.all(foo)
    console.log(result)
    return result

})
}

tagSchema.statics.generateTags = async function (tags) {
    const ltags = tags.map(e => e.toLowerCase().trim()); // trim and lowerCase all strings
    const tagIDs = ltags.map(async e => {
        let tag = await this.findOne({ tag: e });
        // check if tag exists, return tag document
        if (tag)
            return tag
        // else create a new tag document
        tag = await this.create({ tag: e })
        return tag
    })
    const result = Promise.all(tagIDs) // execute all promises in the array
    return result
}

const Tag = mongoose.model("Tag", tagSchema)

module.exports = Tag;

