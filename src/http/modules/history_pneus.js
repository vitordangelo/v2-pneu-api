const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'history-pneu', async (req, res, next) => {
    const historyPneus = req.body
    try {
      res.send(await db.historyPneus().save(historyPneus))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'history-pneu', async (req, res, next) => {
    try {
      res.send(await db.historyPneus().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'history-pneu/:id', async (req, res, next) => {
    try {
      res.send(await db.historyPneus().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'history-pneu/:id', async (req, res, next) => {
    try {
      res.send(await db.historyPneus().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'history-pneu/:id', async (req, res, next) => {
    const vehicle = req.body
    const id = req.params.id
    try {
      res.send(await db.historyPneus().update(id, vehicle))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
