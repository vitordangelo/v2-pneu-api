const restify = require('restify')
const server = restify.createServer()
const routes = require('../http/routes')

server.use(restify.plugins.bodyParser())

routes(server)

module.exports = server
