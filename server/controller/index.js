import { has, get } from './methods.js'; // list of api's actions

/** Handle all api's routes
 * 
 * @param {object} req request object
 * @param {object} res response object
 * @param {Function} next function calling the next middleware
 * @returns {void}
 */
export default (req, res, next) => {
  let action, methodParams = req.body;
  const routeParams = req.params
  
  // define the route action (create/read/update/delete)
  switch (req.method) {
    case 'POST': action = 'create'; routeParams.id = !routeParams.id;break;
    case 'GET': action = 'read'; methodParams = req.query; break;
    case 'PUT': action = 'update'; break;
    case 'DELETE': action = 'delete'; break;
    default: return next();
  }

  // define the action "scale" (one/many)
  action += routeParams.id ? 'One' : 'Many';

  // check if action exist
  if (!has(action)) next()

  console.log('==========')
  // console.log(action)

  // execute the route's action
  get(action)(routeParams, methodParams)
  .then(result => {
    // console.log(result)
    res.json(result)
  })
  
}