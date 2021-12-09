import AccessHandler from './Auth/AccessHandler'

const PermissionMapping = {
  GET: process.env.PERMISSION_GET,
  POST: process.env.PERMISSION_POST,
  PATCH: process.env.PERMISSION_PATCH,
  DELETE: process.env.PERMISSION_DELETE,
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
            rule: 'must-authorize',
          },
        },
      }
    }

    let accessControlResult = await AccessHandler.hasPermission(
      Request.headers.Authorization,
      PermissionMapping[Request.method],
    )

    if (accessControlResult !== true) {
      if (accessControlResult === 'JsonWebTokenError: invalid token') {
        return {
          status: 'failure',
          errors: {
            jwt: {
              message: 'Please check that your JWT is valid!',
              rule: 'must-have-valid-token',
            },
          },
        }
      }

      return {
        status: 'failure',
        errors: {
          role: {
            message: 'Please check that you have correct role to preform this opperation',
            rule: 'must-have-role',
          },
        },
      }
    }
  }
}

export default Middleware
