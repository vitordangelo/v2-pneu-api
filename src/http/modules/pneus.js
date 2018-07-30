const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'pneu', async (req, res, next) => {
    const pneu = req.body
    try {
      res.send(await db.pneus().save(pneu))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'pneus', async (req, res, next) => {
    try {
      res.send(await db.pneus().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'pneu/:id', async (req, res, next) => {
    try {
      res.send(await db.pneus().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'pneu/:id', async (req, res, next) => {
    try {
      res.send(await db.pneus().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'pneu/:id', async (req, res, next) => {
    const pneu = req.body
    const id = req.params.id
    try {
      res.send(await db.pneus().update(id, pneu))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.put(v1 + 'pneu/install-uninstall/:id', async (req, res, next) => {
    const pneu = req.body
    const id = req.params.id
    try {
      res.send(await db.pneus().istallUninstall(id, pneu))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
