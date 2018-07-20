const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'pneus-in-vehicle', async (req, res, next) => {
    const pneusInVehicle = req.body
    try {
      res.send(await db.pneusInVehicle().save(pneusInVehicle))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'pneus-in-vehicle', async (req, res, next) => {
    try {
      res.send(await db.pneusInVehicle().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'pneus-in-vehicle/:id', async (req, res, next) => {
    try {
      res.send(await db.pneusInVehicle().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'pneus-in-vehicle/:id', async (req, res, next) => {
    try {
      res.send(await db.pneusInVehicle().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'pneus-in-vehicle/:id', async (req, res, next) => {
    const vehicle = req.body
    const id = req.params.id
    try {
      res.send(await db.pneusInVehicle().update(id, vehicle))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
