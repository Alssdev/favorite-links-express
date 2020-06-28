const mysql = require('mysql')
const { promisify } = require('util')
const { database } = require('./keys')

const pool = mysql.createPool(database)

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code == 'PROTOCOL_CONNECTION_LOST') {
      console.log('database connection lost')
    } else if ((error.code = 'ER_CON_COUNT_ERROR')) {
      console.log('database has many conection')
    } else if ((error.code = 'ECONNREFUESED')) {
      console.log('database connection was refused')
    }
  }

  if (connection) connection.release()
  console.log('database connected')
  return
})

pool.query = promisify(pool.query)

module.exports = pool
