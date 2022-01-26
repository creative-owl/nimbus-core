'use strict';

var mongoose = require('mongoose');
var Jwt = require('jsonwebtoken');
var uuid = require('uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mongoose__default = /*#__PURE__*/_interopDefaultLegacy(mongoose);
var Jwt__default = /*#__PURE__*/_interopDefaultLegacy(Jwt);

class DatabaseConnectionException extends Error {
  /**
   * Creates a custom error for database exceptions.
   *
   * @param {string} message
   *
   * @returns {Error}
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

const options = {
  autoIndex: false,
  bufferCommands: false,
  serverSelectionTimeoutMS: 3000,
};

class Connection {
  /**
   * Initiates the database connection.
   *
   * @throws {DatabaseConnectionException}
   *
   * @returns {void}
   */
  static async connect() {
    return await mongoose__default["default"].connect(process.env.DB_CONNECTION_STRING, options)
      .catch(async (error) => {
        return Promise.reject(new DatabaseConnectionException(error))
      })
  }

  /**
   * Releases the database connection.
   *
   * @returns {void}
   */
  static async disconnect() {
    return await mongoose__default["default"].disconnect()
  }
}

class Utilities {
  /**
   * Converts a string value to a boolean value.
   *
   * @param {boolean|string} value
   *
   * @returns {boolean}
   */
  static stringToBool(value) {
    if (value === true || value === 'true') {
      return true
    }

    return false
  }
}

class Request {
  /**
   * Constructs a instance of the class.
   *
   * @param {Object<string, any>} event The event passed from the API
   *                                    gateway to the Lambda instance.
   *
   * @returns {Object<string, any>}
   */
  constructor(event) {
    this.event = event;

    return this.format()
  }

  /**
   * Formats the request data in a more unifrom manner.
   *
   * @returns {Object<string, any>}
   */
  format() {
    let request = {};

    request.url = this.event.resource;
    request.body = JSON.parse(this.event.body);
    request.method = this.event.httpMethod;
    request.headers = this.event.headers;
    request.parameters = this.event.queryStringParameters;
    request.pathParameters = this.event.pathParameters;
    request.multiValueParameters = this.event.multiValueQueryStringParameters;

    return request
  }
}

class Response {
  /**
   * Returns a JSON response.
   *
   * @param {number}              status
   * @param {Object<string, any>} body
   * @param {Object<string, any>} headers
   *
   * @returns {Object<string, any>}
   */
  json(status, body, headers) {
    let setHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Methods': process.env.CORS_ALLOWED_METHODS,
      'Access-Control-Allow-Headers': '*, Authorization',
      'Access-Control-Expose-Headers': '*, Authorization',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': process.env.CORS_ALLOWED_ORIGIN,
    };

    let returnHeaders = Object.assign(setHeaders, headers);

    return {
      'statusCode': status,
      'headers': returnHeaders,
      'body': JSON.stringify(body),
    }
  }
}

class JwtActionException extends Error {
  /**
   * Creates a custom error.
   *
   * @param {string} message
   *
   * @returns {Error}
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.type = message.toString();

    Error.captureStackTrace(this, this.constructor);
  }
}

const JwtOptions = {
  algorithm: 'HS256',
  expiresIn: '24h',
};

class JwtHandler {
  /**
   * Refresh's the given token after validating.
   *
   * @param {string} token
   *
   * @throws {JwtActionException}
   *
   * @returns {string}
   */
  static refresh(token) {
    try {
      const payload = this.stripDates(
        this.validate(token),
      );

      return this.generate(payload)
    } catch (error) {
      throw new JwtActionException(error)
    }
  }

  /**
   * Update's a token with a new payload after validating.
   *
   * @param {string} token
   * @param {Object<string, any>} payload
   *
   * @throws {JwtActionException}
   *
   * @returns {string}
   */
  static update(token, payload) {
    try {
      this.validate(token);

      return this.generate(payload)
    } catch (error) {
      throw new JwtActionException(error)
    }
  }

  /**
   * Validates the token.
   *
   * @param {string} token
   *
   * @throws {JwtActionException}
   *
   * @returns {Object<string, any>}
   */
  static validate(token) {
    try {
      return Jwt__default["default"].verify(
        token.split(' ')[1],
        process.env.JWT_SHARED_SECRET,
        JwtOptions,
      )
    } catch (error) {
      throw new JwtActionException(error)
    }
  }

  /**
   * Generates a new token.
   *
   * @param {Object<string, any>} claims
   *
   * @throws {JwtActionException}
   *
   * @returns {string}
   */
  static generate(claims) {
    try {
      return Jwt__default["default"].sign(
        claims,
        process.env.JWT_SHARED_SECRET,
        JwtOptions,
      )
    } catch (error) {
      throw new JwtActionException(error)
    }
  }

  /**
   * Strips the dates from the token before refreshing.
   *
   * @param {Object<string, any>} token
   *
   * @returns {Object<string, any>}
   */
  static stripDates(token) {
    delete token.iat;
    delete token.exp;

    return token
  }
}

const Schema$2 = mongoose__default["default"].Schema;

const PermissionsSchema = new Schema$2({
  _id: {
    type: String,
    default: () => uuid.v4(),
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
});

var Permissions = mongoose__default["default"].model('Permissions', PermissionsSchema);

const Schema$1 = mongoose__default["default"].Schema;

const RolesPermissionsSchema = new Schema$1({
  _id: {
    type: String,
    default: () => uuid.v4(),
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
});

var RolesPermissions = mongoose__default["default"].model('RolesPermissions', RolesPermissionsSchema);

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
  static async hasPermission(token, permission) {
    try {
      const tokenObject = await JwtHandler.validate(token);
      const userPermissions = await this.getPermissions(tokenObject.user.role);
      const requiredPermission = await this.getPermissionIdFromName(permission);

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
}

const PermissionMapping = {
  GET: process.env.PERMISSION_GET,
  POST: process.env.PERMISSION_POST,
  PATCH: process.env.PERMISSION_PATCH,
  DELETE: process.env.PERMISSION_DELETE,
};

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
    );

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

class Http {
  /**
   * Handles the http request and response.
   *
   * @param {Object<string, any>} event   @inheritdoc
   * @param {Object<string, any>} context @inheritdoc
   * @param {Controller}          Controller
   *
   * @returns {Object<string, any>}
   */
  // eslint-disable-next-line no-unused-vars
  async route(event, context, Controller) {
    let method = event.httpMethod.toLowerCase();
    let request = new Request(event);
    let response = new Response;

    if (
      Utilities.stringToBool(process.env.AUTH_ENABLED) &&
      request.method !== 'OPTIONS'
    ) {
      let middleware = await (new Middleware).hasAccess(request);

      if (middleware) {
        return response.json(401, middleware)
      }
    }

    return await (new Controller)[method](
      request, response,
    )
  }
}

const Schema = mongoose__default["default"].Schema;

const RolesSchema = new Schema({
  _id: {
    type: String,
    default: () => uuid.v4(),
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
});

var Roles = mongoose__default["default"].model('Roles', RolesSchema);

class Controller {
  /**
   * Render a successful response object.
   *
   * @param   {Object<string, any>} attributes
   *
   * @returns {Object<string, any>}
   */
  success(attributes) {
    return {
      status: 'success',
      attributes,
    }
  }

  /**
   * Render a validation failure response object.
   *
   * @param   {Array<Object<string, any>>} errors
   *
   * @returns {Object<string, any>}
   */
  validation(errors) {
    const errorArray = [];

    for (const error in errors) {
      errorArray.push({
        name: error,
        message: errors[error].message,
        rule: errors[error].rule,
      });
    }

    return {
      status: 'failure',
      errors: errorArray,
    }
  }

  /**
   * Render a exception failure response object.
   *
   * @param   {Object<string, any>} exception
   *
   * @returns {Object<string, any>}
   */
  exception(exception) {
    return {
      status: 'failure',
      errors: [
        {
          name: exception.name,
          message: exception.message,
          stack: exception.stack,
        },
      ],
    }
  }
}

var index = {
  db: Connection,
  Http,
  Roles,
  Controller,
  JwtHandler,
  Permissions,
  RolesPermissions,
};

module.exports = index;
