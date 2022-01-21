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
    const errorArray = []

    for (const error in errors) {
      errorArray.push({
        name: error,
        message: errors[error].message,
        rule: errors[error].rule,
      })
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

export default Controller
