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
    this.event = event

    return this.format()
  }

  /**
   * Formats the request data in a more unifrom manner.
   *
   * @returns {Object<string, any>}
   */
  format() {
    let request = {}

    request.url = this.event.resource
    request.body = JSON.parse(this.event.body)
    request.method = this.event.httpMethod
    request.headers = this.event.headers
    request.parameters = this.event.queryStringParameters
    request.pathParameters = this.event.pathParameters
    request.multiValueParameters = this.event.multiValueQueryStringParameters

    return request
  }
}

export default Request
