class JwtActionException extends Error {
  /**
   * Creates a custom error.
   *
   * @param {string} message
   *
   * @returns {Error}
   */
  constructor(message) {
    super(message)

    this.name = this.constructor.name
    this.type = message.toString()

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = JwtActionException
