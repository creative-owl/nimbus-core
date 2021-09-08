const mongoose = require('mongoose');
const options = {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};
const DatabaseConnectionException =
  require('./Errors/DatabaseConnectionException');

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
        return Promise.reject(new DatabaseConnectionException(error));
      });
  }

  /**
   * Releases the database connection.
   *
   * @returns {void}
   */
  static async disconnect() {
    return await mongoose.disconnect();
  }
}

module.exports = Connection;
