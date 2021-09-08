
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid')

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
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'roles',
})

module.exports = mongoose.model('Roles', RolesSchema)
