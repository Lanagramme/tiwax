import { Router } from 'express';
const router = Router();
import controller from '../controller/index.js';

/* GET home page. */
router.get(
  /^(?!\/api\/v1\/)/gm,
  (req, res, next) => {
    try {
      res.sendFile(`${process.cwd()}/public/index.html`)
    } catch { next() }
  }
)
router.all('/api/v1/:collection/:id?', controller)

export default router;
 