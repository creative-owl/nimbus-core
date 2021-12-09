const JwtHandler = require('./JwtHandler')
const Permissions = require('../Models/Permissions')
const RolesPermissions = require('../Models/RolesPermissions')

class AccessHandler {
  /**
   * Determines if the user has the permission needed to perform the action.
   *
   * @param {string} token
   * @param {string} permission
   *
   * @throws {AccessControlException}
   *
   * @returns {boolean}
   */
  static async hasAccess(token, permission) {
    try {
      const tokenObject = await JwtHandler.validate(token)
      const userPermissions = await this.getPermissions(tokenObject.user.role)
      const requiredPermission = await this.getPermissionIdFromName(permission)

      for (let i in userPermissions) {
        if (userPermissions[i].permission_id === requiredPermission._id) {
          return true
        }
      }
    } catch (error) {
      return error.type
    }

    return false
  }

  /**
   * Gets all the permissions assigned to the users role.
   *
   * @param {string} id
   *
   * @throws {Error}
   *
   * @returns {Object<string, any>}
   */
  static async getPermissions(id) {
    try {
      return await RolesPermissions.find({ role_id: id })
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Gets the permission id from the permission name.
   *
   * @param {string} name
   *
   * @throws {Error}
   *
   * @returns {Object<string, any>}
   */
  static async getPermissionIdFromName(name) {
    try {
      return await Permissions.findOne({ name: name })
    } catch (error) {
      throw new Error(error)
    }
  }
};

module.exports = AccessHandler
