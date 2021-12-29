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
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': process.env.CORS_ALLOWED_ORIGIN,
    }

    let returnHeaders = Object.assign(setHeaders, headers)

    return {
      'statusCode': status,
      'headers': returnHeaders,
      'body': JSON.stringify(body),
    }
  }
};

export default Response
