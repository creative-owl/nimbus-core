import Jwt from 'jsonwebtoken'
import JwtActionException from '../Errors/JwtActionException'

const JwtOptions = {
  algorithm: 'HS256',
  expiresIn: '24h',
}

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
      )

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
      this.validate(token)

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
      return Jwt.verify(
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
      return Jwt.sign(
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
    delete token.iat
    delete token.exp

    return token
  }
}

export default JwtHandler
