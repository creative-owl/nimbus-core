import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema

const PermissionsSchema = new Schema({
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
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'permissions',
})

export default mongoose.model('Permissions', PermissionsSchema)
