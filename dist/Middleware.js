const AccessHandler = require('./Auth/AccessHandler')

const RoleMapping = {
  GET: process.env.ROLE_MAPPING_GET,
  POST: process.env.ROLE_MAPPING_POST,
  PATCH: process.env.ROLE_MAPPING_PATCH,
  DELETE: process.env.ROLE_MAPPING_DELETE,
}

class Middleware {
  /**
   * Determines if the incomming request has access to preform the
   * action.
   *
   * @param {Object<string, any>} Request
   *
   * @returns {Object<string, any>|void}
   */
  async hasAccess(Request) {
    if ('Authorization' in Request.headers === false) {
      return {
        status: 'failure',
        errors: {
          authorization: {
            message: 'Authorization token was not found!',
            rule: 'must-authorize'
          }
        }
      }
    }

    let accessControlResult = await AccessHandler.hasRole(
      Request.headers.Authorization,
      RoleMapping[Request.method]
    )

    if (accessControlResult !== true) {
      if (accessControlResult === 'JsonWebTokenError: invalid token') {
        return {
          status: 'failure',
          errors: {
            jwt: {
              message: 'Please check that your JWT is valid!',
              rule: 'must-have-valid-token'
            }
          }
        }
      }

      return {
        status: 'failure',
        errors: {
          role: {
            message: 'Please check that you have correct role to preform this opperation',
            rule: 'must-have-role'
          }
        }
      }
    }
  }
}

module.exports = Middleware
