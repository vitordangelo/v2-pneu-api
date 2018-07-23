const users = require('./modules/users')
const pneus = require('./modules/pneus')
const vehicles = require('./modules/vehicles')
const pneusInVehicles = require('./modules/pneusInVehicle')
const historyPneus = require('./modules/history_pneus')

const db = require('../services/mysql')

const routes = (server) => {
  users(server)
  pneus(server)
  vehicles(server)
  pneusInVehicles(server)
  historyPneus(server)

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
