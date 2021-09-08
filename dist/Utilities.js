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
      return true;
    }

    return false;
  }
};

module.exports = Utilities;
