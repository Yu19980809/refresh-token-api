import Commodity from '../models/commodity.js'

const fetchAllCommodities = async (req, res) => {
  try {
    const commodities = await Commodity.find().sort({createdAt: -1})
    res.status(200).json({data: commodities})
  } catch (error) {
    console.log('Failed to fetch all commodities', error)
    res.status(500).json({messae: 'Failed to fetch all commodities'})
  }
}

const addCommodity = async (req, res) => {
  try {
    const {name, price} = req.body
    const newCommodity = await Commodity.create({name, price})
    res.status(200).json({data: newCommodity})
  } catch (error) {
    console.log('Failed to add commodity', error)
    res.status(500).json({message: 'Failed to add commodity'})
  }
}


export {
  fetchAllCommodities,
  addCommodity
}
