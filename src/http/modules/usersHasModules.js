const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'user_has_module', async (req, res, next) => {
    const userHasModule = req.body
    try {
      res.send(await db.usersHasModules().save(userHasModule))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'user_has_modules', async (req, res, next) => {
    try {
      res.send(await db.usersHasModules().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'user_has_module/:id', async (req, res, next) => {
    try {
      res.send(await db.usersHasModules().one(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.del(v1 + 'user_has_module/:user_id/:module_id', async (req, res, next) => {
    try {
      res.send(await db.usersHasModules().del(req.params.user_id, req.params.module_id))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.put(v1 + 'users_module/:userId/:moduleId', async (req, res, next) => {
    const module = req.body
    const userId = req.params.userId
    const moduleId = req.params.moduleId
    try {
      res.send(await db.usersHasModules().update(userId, moduleId, module))
    } catch (error) {
      res.send(422, error)
    }
    next()
  })

  server.get(v1 + 'users_module/:id', async (req, res, next) => {
    try {
      res.send(await db.usersHasModules().usersByModuleId(req.params.id))
    } catch (error) {
      res.send(error)
    }
    next()
  })
}

module.exports = routes
