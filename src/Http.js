import Utils from './Utilities'
import Request from './Request'
import Response from './Response'
import Middleware from './Middleware'

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

    return await (new Controller)[method](
      request, response,
    )
  }
}

export default Http
