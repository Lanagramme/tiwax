const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema(
  {
   open : Boolean
  }, {
    versionKey: false // You should be aware of the outcome after set to false
})


const Store = mongoose.model('Store', StoreSchema)

module.exports = Store