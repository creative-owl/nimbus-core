const Roles = require('../Models/Roles')
const JwtHandler = require('./JwtHandler')

class AccessHandler {
  /**
   * Determines if the user has the role needed to perform the action.
   *
   * @param {string} token
   * @param {string} requiredRoleName
   *
   * @throws {AccessControlException}
   *
   * @returns {boolean}
   */
  static async hasRole(token, requiredRoleName) {
    try {
      // const tokenObject = await JwtHandler.validate(token)
      // const requiredRoleId = await this.getRoleIdFromRoleName(requiredRoleName)
      // const userRolesObject = await this.getAllUserRoles(tokenObject.user.id)

      // for (let i in userRolesObject) {
      //   if (userRolesObject[i].role_id === requiredRoleId._id) {
      //     return true
      //   }
      // }
    } catch (error) {
      return error.type
    }

    return false
  }

  /**
   * Gets all the roles assigned to the user.
   *
   * @param {string} id
   *
   * @throws {Error}
   *
   * @returns {Object<string, any>}
   */
  // static async getAllUserRoles(id) {
  //   try {
  //     return await UserRoles.find({ user_id: id })
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }

  /**
   * Gets the role id from the role name.
   *
   * @param {string} roleName
   *
   * @throws {Error}
   *
   * @returns {Object<string, any>}
   */
  // static async getRoleIdFromRoleName(roleName) {
  //   try {
  //     return await Roles.findOne({ name: roleName })
  //   } catch (error) {
  //     throw new Error(error)
  //   }
  // }
};

module.exports = AccessHandler
