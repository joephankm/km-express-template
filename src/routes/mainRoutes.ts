import { Router } from 'express';

import { privateRouter as router } from './routers';
import * as user from '#controllers/userController';
import * as general from '#controllers/generalController';
import * as item from '#controllers/itemController';

const userRoutes = Router();
router.use('/users', userRoutes);

userRoutes
  .get('/', user.listUsers) // GET /users
  .get('/:id', user.getUser) // GET /users/:id
  .post('/', user.createUser) // POST /users
  .patch('/:id', user.updateUser) // PATCH /users/:id
  .delete('/:id', user.deleteUser); // DELETE /users/:id

const roleRoutes = Router();
router.use('/roles', roleRoutes);

roleRoutes
  .get('/', user.listRoles) // GET /roles
  .get('/:id', user.getRole) // GET /roles/:id
  .post('/', user.createRole) // POST /roles
  .patch('/:id', user.updateRole) // PATCH /roles/:id
  .delete('/:id', user.deleteRole); // DELETE /roles/:id

const settingRoutes = Router();
router.use('/settings', settingRoutes);

settingRoutes
  .get('/', general.listSettings) // GET /settings
  .get('/:id', general.getSetting) // GET /settings/:id
  .post('/', general.createSetting) // POST /settings
  .patch('/:id', general.updateSetting) // PATCH /settings/:id
  .delete('/:id', general.deleteSetting); // DELETE /settings/:id

const categoryRoutes = Router();
router.use('/categories', categoryRoutes);

categoryRoutes
  .get('/', item.listCategories) // GET /categories
  .get('/:id', item.getCategory) // GET /categories/:id
  .post('/', item.createCategory) // POST /categories
  .patch('/:id', item.updateCategory) // PATCH /categories/:id
  .delete('/:id', item.deleteCategory); // DELETE /categories/:id

const itemRoutes = Router();
router.use('/items', itemRoutes);

itemRoutes
  .get('/', item.listItems) // GET /items
  .get('/:id', item.getItem) // GET /items/:id
  .post('/', item.createItem) // POST /items
  .patch('/:id', item.updateItem) // PATCH /items/:id
  .delete('/:id', item.deleteItem); // DELETE /items/:id

const childItemRoutes = Router({ mergeParams: true });
itemRoutes.use('/:itemId/children', childItemRoutes);

childItemRoutes
  .get('/', item.listChildren) // GET /items/:itemId/children
  .get('/:id', item.getChild) // GET /items/:itemId/children/:id
  .post('/', item.createChild) // POST /items/:itemId/children
  .patch('/:id', item.updateChild) // PATCH /items/:itemId/children/:id
  .delete('/:id', item.deleteChild); // DELETE /items/:itemId/children/:id
