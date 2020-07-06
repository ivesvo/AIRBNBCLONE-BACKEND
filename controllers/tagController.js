const Tag = require('../models/tag')
// const User = require('../models/user')


exports.createTag = async (req, res) => {
    
    try {
        const { tagname } = req.body
        if (!tagname) {
            return res.status(401).json({
                status: "fail",
                error: "Tag Not Found"
            })
        };
        const tag = await Tag.create({
            tag: tagname
        })
        res.status(201).json({ status: "Successfully Adding Tag", data: tag })




    } catch (err) {
        return res.status(401).json({
            status: "fail",
            error: `Fail to create tag ${err.message}`
        })
    }
}


exports.getTagList = async (req, res) => {
    
    try {
        const tagList = await Tag.find({})
        res.status(200).json({
            status: "Success",
            data: tagList
        })

    } catch (err) {
        return res.status(401).json({
            status: "fail",
            error: `Fail to show tag list ${err.message}`
        })
    }


}

exports.updateTag = async (req, res) => {
    try {
        const { tagname } = req.body
        const tag = await Tag.findByIdAndUpdate(req.params.tid, {
           tag: tagname
        })
        res.status(200).json({
            status: "Successfully Editing Your Tag",
            data: tag
        })  
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })

    }

}

exports.deleteTag = async (req,res)=>{
    try{
        const tag = await Tag.findByIdAndDelete(req.params.tid)
        res.status(200).json({
            status: "Successfully Deleting Your Tag",
            data: tag
        })


    } catch (err){
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })

    }

}