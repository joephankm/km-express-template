import { publicRouter as router } from './routers';
import * as user from '#controllers/userController';

router.get('/users/:id', user.getPublicUser); // GET /public/users/:id
