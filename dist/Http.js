const Utils = require('./Utilities')
const Request = require('./Request')
const Response = require('./Response')
const Middleware = require('./Middleware')

class Http {
  /**
   * Handles the http request and response.
   *
   * @param {Object<string, any>} event   @inheritdoc
   * @param {Object<string, any>} context @inheritdoc
   * @param {Controller}          controller
   *
   * @returns {Object<string, any>}
   */
  // eslint-disable-next-line no-unused-vars
  async route(event, context, controller) {
    let method = event.httpMethod.toLowerCase()
    let request = new Request(event)
    let response = new Response

    if (
      Utils.stringToBool(process.env.AUTH_ENABLED) &&
      request.method !== 'OPTIONS'
    ) {
      let middleware = await (new Middleware).hasAccess(request)

      if (middleware) {
        return response.json(401, middleware)
      }
    }

    return await controller[method](
      request, response,
    )
  }
}

module.exports = Http
