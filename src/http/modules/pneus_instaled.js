const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'pneus_instaled', async (req, res, next) => {
    const pneuInstaled = req.body
    try {
      res.send(await db.pneusInstaled().save(pneuInstaled))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'pneus_instaled', async (req, res, next) => {
    try {
      res.send(await db.pneusInstaled().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'pneus_instaled/:id', async (req, res, next) => {
    try {
      res.send(await db.pneusInstaled().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'pneus_instaled/:id', async (req, res, next) => {
    try {
      res.send(await db.pneusInstaled().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'pneus_instaled/:id', async (req, res, next) => {
    const vehicle = req.body
    const id = req.params.id
    try {
      res.send(await db.pneusInstaled().update(id, vehicle))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
