const [...collections] = require('./controller/classes').keys()
const data = {}
module.exports = collections.reduce((mod,key)=>{
  return (mod[key] = []), mod;
}, data)
