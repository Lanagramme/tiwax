const methodsMap = require('./methods')

module.exports = (req, res, next) => {
  let action, methodParams = req.body, result;
  const routeParams = req.params
  switch (req.method) {
    case 'POST': action = 'create'; routeParams.id = !routeParams.id;break;
    case 'GET': action = 'read'; methodParams = req.query; break;
    case 'PUT': action = 'update'; break;
    case 'DELETE': action = 'delete'; break;
    default: return next();
  }

  action += routeParams.id ? 'One' : 'Many';
  

  methodsMap.has(action) && (result = methodsMap.get(action)(routeParams, methodParams))
  return result ? res.json(result) : next();
  
}