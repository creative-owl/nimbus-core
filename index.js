const db = require('./dist/Connection')
const Http = require('./dist/Http')
const Roles = require('./dist/Models/Roles')
const Controller = require('./dist/Controller')
const JwtHandler = require('./dist/Auth/JwtHandler')
const Permissions = require('./dist/Models/Permissions')
const RolesPermissions = require('./dist/Models/RolesPermissions')

module.exports = {
  db,
  Http,
  Roles,
  Controller,
  JwtHandler,
  Permissions,
  RolesPermissions,
}
