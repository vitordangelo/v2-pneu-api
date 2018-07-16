const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'signin', async (req, res, next) => {
    const user = req.body
    try {
      res.send(await db.users().save(user))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'users', async (req, res, next) => {
    try {
      res.send(await db.users().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'user/:id', async (req, res, next) => {
    try {
      res.send(await db.users().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'user/:id', async (req, res, next) => {
    try {
      res.send(await db.users().del(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'user/:id', async (req, res, next) => {
    const user = req.body
    const id = req.params.id
    try {
      res.send(await db.users().update(id, user))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'user_by_email/:email', async (req, res, next) => {
    try {
      res.send(await db.users().email(req.params.email))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'user/password/:id', async (req, res, next) => {
    const user = req.body
    const id = req.params.id
    try {
      res.send(await db.users().updatePassword(id, user))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
