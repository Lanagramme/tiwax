const epsjs = require('epsjs')
const webSocket = require('./socketIO')
const controller = require('./controller')

// multi line
const server = new epsjs
server
  // api routes
  .add.route({
    method: 'all',
    path: '/api/v1/:collection/:id?',
    callback: controller
  })
  // access to public folder
  .add.dir('/',__dirname+'/public')
  // websocket
  .add.webSocket(webSocket) 
  .run()