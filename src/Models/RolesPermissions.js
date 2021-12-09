import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema

const RolesPermissionsSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
  },
  role_id: {
    type: String,
    required: true,
  },
  permission_id: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'roles_permissions',
})

export default mongoose.model('RolesPermissions', RolesPermissionsSchema)
