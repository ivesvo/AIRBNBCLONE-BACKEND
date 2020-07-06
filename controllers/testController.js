var faker = require('faker')
const Exp = require('../models/experience')
const Tag = require('../models/tag')

exports.generateExp = async function (req, res) {
  console.log('haha')
  const arr = []
  for (let i = 0; i < 50; i++) {
    const obj = new Exp()

    obj.title = faker.lorem.sentence()
    obj.description = faker.lorem.paragraph()
    obj.country = faker.address.country()
    obj.price = faker.commerce.price()
    obj.pictureURL = [faker.image.image(), faker.image.image(), faker.image.image(), faker.image.image(), faker.image.image()]
    obj.duration = faker.random.number()
    obj.items = [faker.random.words(), faker.random.words(), faker.random.words()]
    obj.groupsize = faker.random.number()
    obj.language = faker.address.countryCode()

    const tags = [
      "cookings",
      "animals",
      "adventures",
      "arts & writing",
      "dance",
      "drinks",
      "wellness",
      "entertainments",
      "history & culture",
      "designed for accessability"

    ]

    obj.tags = await Tag.generateTags(tags)
    arr.push(obj)

    // const expList = await arr.find({})

  }
  
  const fakeData = await Exp.insertMany(arr)

  res.status(201).json({ status: "OK", data: fakeData })
  


}




