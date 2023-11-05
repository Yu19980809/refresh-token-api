import mongoose from 'mongoose'

const commoditySchema = new mongoose.Schema({
  name: {type: String, require: true},
  price: {type: Number, require: true},
  status: {type: String, default: 'on'}
}, {timestamps: true})

export default mongoose.model('Commodity', commoditySchema)
