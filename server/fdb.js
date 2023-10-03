const collections = require('./controller/formats').collections
const data = collections.reduce((mod,key)=>{
  return (mod[key] = []), mod;
}, {})
console.log(data)
module.exports = data
