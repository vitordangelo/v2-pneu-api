const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'module', async (req, res, next) => {
    const module = req.body
    try {
      res.send(await db.modules().save(module))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'modules', async (req, res, next) => {
    try {
      res.send(await db.modules().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'module/:hash', async (req, res, next) => {
    try {
      res.send(await db.modules().one(req.params.hash))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'module/:hash', async (req, res, next) => {
    try {
      res.send(await db.modules().del(req.params.hash))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'module/:hash', async (req, res, next) => {
    const module = req.body
    const hash = req.params.hash
    try {
      res.send(await db.modules().update(hash, module))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
