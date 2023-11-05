import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  open_id: {type: String, require: true},
  name: String,
  tel: String
}, {timestamps: true})

export default mongoose.model('User', userSchema)
