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
const moduleModule = require('./modules')({ connection, errorHandler })
const userHasModuleModule = require('./usersHasModules')({ connection, errorHandler })
const history = require('./history')({ connection, errorHandler })
const auth = require('./auth')({ connection, errorHandler })

module.exports = {
  users: () => userModule,
  modules: () => moduleModule,
  usersHasModules: () => userHasModuleModule,
  history: () => history,
  auth: () => auth
}
