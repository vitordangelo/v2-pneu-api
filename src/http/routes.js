const users = require('./modules/users')
const modules = require('./modules/modules')
const userHasModule = require('./modules/usersHasModules')
const historyEvent = require('./modules/history')

const db = require('../services/mysql')

const routes = (server) => {
  users(server)
  modules(server)
  userHasModule(server)
  historyEvent(server)

  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence!')
    next()
  })

  server.post('/api/v1/auth', async (req, res, next) => {
    try {
      const { email, password } = req.body
      res.send(await db.auth().authenticate(email, password))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
