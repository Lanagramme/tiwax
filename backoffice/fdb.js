const [...collections] = require('./controller/classes').keys()
const data = collections.reduce((mod,key)=>{
  return (mod[key] = []), mod;
}, {})
console.log(data)
module.exports = data
