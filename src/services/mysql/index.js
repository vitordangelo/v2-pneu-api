const mysqlServer = require('mysql')
const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  multipleStatements: true
})

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error)
  rejectFunction({ error: msg })
}

const userModule = require('./users')({ connection, errorHandler })
const auth = require('./auth')({ connection, errorHandler })
const pneus = require('./pneus')({ connection, errorHandler })
const vehicles = require('./vehicles')({ connection, errorHandler })
const pneusInVehicle = require('./pneusInVehicle')({ connection, errorHandler })

module.exports = {
  users: () => userModule,
  auth: () => auth,
  pneus: () => pneus,
  vehicles: () => vehicles,
  pneusInVehicle: () => pneusInVehicle
}
