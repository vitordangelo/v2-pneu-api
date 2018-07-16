const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'vehicle', async (req, res, next) => {
    const vehicle = req.body
    try {
      res.send(await db.vehicles().save(vehicle))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'vehicles', async (req, res, next) => {
    try {
      res.send(await db.vehicles().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'vehicle/:id', async (req, res, next) => {
    try {
      res.send(await db.vehicles().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'vehicle/:id', async (req, res, next) => {
    try {
      res.send(await db.vehicles().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'vehicle/:id', async (req, res, next) => {
    const vehicle = req.body
    const id = req.params.id
    try {
      res.send(await db.vehicles().update(id, vehicle))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
