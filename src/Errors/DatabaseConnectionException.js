class DatabaseConnectionException extends Error {
  /**
   * Creates a custom error for database exceptions.
   *
   * @param {string} message
   *
   * @returns {Error}
   */
  constructor(message) {
    super(message)

    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}

export default DatabaseConnectionException
