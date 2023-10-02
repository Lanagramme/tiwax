require('dotenv').config()
const epsjs = require('epsjs')
const webSocket = require('./socketIO')
const controller = require('./controller')
const mongoose = require('mongoose')
const menus = require('./models/menussModel')
const products = require('./models/produitsModel')
const { produits } = require('./data')
const cors = require('cors')

console.log('Connection à la Base de donnée ... ')

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Base de donnée connectée !')
  
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
    .add.middleware(cors())
    .run()

}).catch(err => console.log(err))