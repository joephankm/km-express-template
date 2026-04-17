import { Router } from 'express';
import { privateRouter as router } from './routers';

const userRoutes = Router();
router.use('/users', userRoutes);

userRoutes
  .get('/', (_req, res) => {
    // GET /users

    res.send({ status: 'OK', data: [] });
  })
  .get('/:id', (req, res) => {
    // GET /users/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  })
  .post('/', (req, res) => {
    // POST /users

    res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
  })
  .patch('/:id', (req, res) => {
    // PATCH /users/:id

    const body = req.body as Record<string, unknown>;
    res.send({ status: 'OK', data: { id: req.params.id, ...body } });
  })
  .delete('/:id', (req, res) => {
    // DELETE /users/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  });

const roleRoutes = Router();
router.use('/roles', roleRoutes);

roleRoutes
  .get('/', (_req, res) => {
    // GET /roles

    res.send({ status: 'OK', data: [] });
  })
  .get('/:id', (req, res) => {
    // GET /roles/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  })
  .post('/', (req, res) => {
    // POST /roles

    res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
  })
  .patch('/:id', (req, res) => {
    // PATCH /roles/:id

    const body = req.body as Record<string, unknown>;
    res.send({ status: 'OK', data: { id: req.params.id, ...body } });
  })
  .delete('/:id', (req, res) => {
    // DELETE /roles/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  });

const settingRoutes = Router();
router.use('/settings', settingRoutes);

settingRoutes
  .get('/', (_req, res) => {
    // GET /settings

    res.send({ status: 'OK', data: [] });
  })
  .get('/:id', (req, res) => {
    // GET /settings/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  })
  .post('/', (req, res) => {
    // POST /settings

    res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
  })
  .patch('/:id', (req, res) => {
    // PATCH /settings/:id

    const body = req.body as Record<string, unknown>;
    res.send({ status: 'OK', data: { id: req.params.id, ...body } });
  })
  .delete('/:id', (req, res) => {
    // DELETE /settings/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  });

const categoryRoutes = Router();
router.use('/categories', categoryRoutes);

categoryRoutes
  .get('/', (_req, res) => {
    // GET /categories

    res.send({ status: 'OK', data: [] });
  })
  .get('/:id', (req, res) => {
    // GET /categories/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  })
  .post('/', (req, res) => {
    // POST /categories

    res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
  })
  .patch('/:id', (req, res) => {
    // PATCH /categories/:id

    const body = req.body as Record<string, unknown>;
    res.send({ status: 'OK', data: { id: req.params.id, ...body } });
  })
  .delete('/:id', (req, res) => {
    // DELETE /categories/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  });

const itemRoutes = Router();
router.use('/items', itemRoutes);

itemRoutes
  .get('/', (_req, res) => {
    // GET /items

    res.send({ status: 'OK', data: [] });
  })
  .get('/:id', (req, res) => {
    // GET /items/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  })
  .post('/', (req, res) => {
    // POST /items

    res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
  })
  .patch('/:id', (req, res) => {
    // PATCH /items/:id

    const body = req.body as Record<string, unknown>;
    res.send({ status: 'OK', data: { id: req.params.id, ...body } });
  })
  .delete('/:id', (req, res) => {
    // DELETE /items/:id

    res.send({ status: 'OK', data: { id: req.params.id } });
  });

const childItemRoutes = Router({ mergeParams: true });
itemRoutes.use('/:itemId/children', childItemRoutes);

childItemRoutes
  .get('/', (req, res) => {
    // GET /items/:itemId/children

    const { itemId } = req.params as Record<string, string>;
    res.send({ status: 'OK', data: { itemId, children: [] } });
  })
  .get('/:id', (req, res) => {
    // GET /items/:itemId/children/:id

    const { itemId, id } = req.params as Record<string, string>;
    res.send({ status: 'OK', data: { itemId, id } });
  })
  .post('/', (req, res) => {
    // POST /items/:itemId/children

    const { itemId } = req.params as Record<string, string>;
    res.status(201).send({ status: 'OK', data: { itemId, ...(req.body as Record<string, unknown>) } });
  })
  .patch('/:id', (req, res) => {
    // PATCH /items/:itemId/children/:id

    const { itemId, id } = req.params as Record<string, string>;
    const body = req.body as Record<string, unknown>;
    res.send({ status: 'OK', data: { itemId, id, ...body } });
  })
  .delete('/:id', (req, res) => {
    // DELETE /items/:itemId/children/:id

    const { itemId, id } = req.params as Record<string, string>;
    res.send({ status: 'OK', data: { itemId, id } });
  });
