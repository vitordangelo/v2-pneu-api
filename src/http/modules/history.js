const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'arm_disarm_user', async (req, res, next) => {
    const event = req.body
    try {
      res.send(await db.history().armDesarmUser(event))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'events_by_hash_module/:hash', async (req, res, next) => {
    try {
      res.send(await db.history().eventsByModuleHash(req.params.hash))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
