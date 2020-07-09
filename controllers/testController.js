var faker = require('faker')
const Exp = require('../models/experience')
const Tag = require('../models/tag')

exports.generateExp = async function (req, res) {
  
  const arr = []
  const tags = [
    "Cookings",
    "Animals",
    "Adventures",
    "Arts & Writing",
    "Dance",
    "Drinks",
    "Wellness",
    "Entertainments",
    "History & Culture",
    "Designed for Accessability"

  ]
  for (let i = 0; i < 50; i++) {
    let hehe = []
    const random = Math.floor((Math.random()*10))

    for (let j = 0; j<random;j++){
      hehe.push(tags[Math.floor(Math.random() * tags.length)])
    }
    const obj = new Exp()

    obj.title = faker.lorem.sentence()
    obj.description = faker.lorem.paragraphs()
    obj.country = faker.address.country()
    obj.price = faker.commerce.price()
    obj.pictureURL = [faker.image.image(), faker.image.image(), faker.image.image(), faker.image.image(), faker.image.image()]
    obj.duration = Math.fround((Math.random()*3)).toFixed(1)
    obj.items = [faker.random.words(), faker.random.words(), faker.random.words()]
    obj.groupsize = faker.random.number()
    obj.language = faker.address.countryCode()
    obj.hostpictureURL= faker.image.avatar()
    obj.hostname = faker.name.firstName()
    obj.rating = (Math.random()*5).toFixed(1)
    
    
    obj.tags = await Tag.generateTags(hehe)
    arr.push(obj)

    // const expList = await arr.find({})

  }
  
  const fakeData = await Exp.insertMany(arr)

  res.status(201).json({ status: "OK", data: fakeData })
  


}




