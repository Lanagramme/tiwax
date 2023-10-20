import { Schema, model } from 'mongoose'

const StoreSchema = Schema(
  {
   open : "Boolean"
  }, {
    versionKey: false // You should be aware of the outcome after set to false
})


const Store = model('Store', StoreSchema)

export default {Store}