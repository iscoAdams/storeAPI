import getall from './getall.js';
// import getone from './getone.js';
// import {createfaker} from './create.js';
import create from './create.js';
// import deleteone from './deleteone.js';
// import updateone from './updateone.js';
import {Router} from 'express';
const router = Router();
router.route('/').get(getall).post(create);
// router.route('/faker').post(createfaker);
// router.route('/:id').get(getone).patch(updateone).delete(deleteone);
// router.route('/static').get(getallstatic);
// router.route()
export default router;