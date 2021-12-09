import mongoose from 'mongoose'
import DatabaseConnectionException from './Errors/DatabaseConnectionException'

const options = {
  autoIndex: false,
  bufferCommands: false,
  serverSelectionTimeoutMS: 3000,
}

class Connection {
  /**
   * Initiates the database connection.
   *
   * @throws {DatabaseConnectionException}
   *
   * @returns {void}
   */
  static async connect() {
    return await mongoose.connect(process.env.DB_CONNECTION_STRING, options)
      .catch(async (error) => {
        return Promise.reject(new DatabaseConnectionException(error))
      })
  }

  /**
   * Releases the database connection.
   *
   * @returns {void}
   */
  static async disconnect() {
    return await mongoose.disconnect()
  }
}

export default Connection
