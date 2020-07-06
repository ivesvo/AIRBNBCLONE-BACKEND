


// exports.deleteOne = Model => async(req,res,next)=>{
//     try{
//         let filterObj = {}
//         if(Model.modelName  === "Exp"){
//             filterObj._id = req.params.eid;
//             filterObj.host = req.user._id
//         } else if (Model.modelName === "Review"){
//             filterObj._id = req.params.rid;
//             filterObj.host = req.user._id
//         }
        
//         const doc = Model.findOneAndDelete(filterObj)
//         if (!doc) return res.status(404).json({statsus:"fail", message: "No document found"})
//         res.status(204).end()
//     }
//     catch(err){
//         console.log(err)
//         return res.status(500).json({status:"error", message: err.message })

//     }

// }


// exports.updateOne = Model => (req,res,next)=>{
//     try{
//         let filterObj ={}
//         let allows = []
//         if(Model.modelname === "Exp"){
//             filterObj._id = req.params.eid;
//             filterObj.host = req.user._id
//             allows = ["title", "description", "tag"]
          
//         } else if (Model.modelname === "Review"){
//             filterObj._id = req.params.rid,
//             filterObj._id = req.user._id
//         }
//         const doc = await Model.findOne(filterObj)
        
//         for (const key in req.body){
//             if(!allows.includes(key)){
//                 doc[key] = req.body[key]
//             }
//         };
//         await doc.save()
//         res.status(200).json({data: 'ok', data: doc})
//     }
  
//     catch(err){
//         console.log(err)
//         return res.status(500).json({status:"error", message: err.message})

//     }
// }