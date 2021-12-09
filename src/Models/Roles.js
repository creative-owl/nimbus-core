import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema

const RolesSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    default:null,
    required: false,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'roles',
})

export default mongoose.model('Roles', RolesSchema)
