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
   * @param   {Object<string, any>} errors
   *
   * @returns {Object<string, any>}
   */
  validation(errors) {
    return {
      status: 'failure',
      errors: errors,
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
      errors: {
        [exception.name]: {
          message: exception.message,
          stack: exception.stack,
        },
      },
    }
  }
}

export default Controller
