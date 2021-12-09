const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid')

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

module.exports = mongoose.model('RolesPermissions', RolesPermissionsSchema)
