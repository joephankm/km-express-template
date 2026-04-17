import { publicRouter as router } from './routers';

router.get('/users/:id', (req, res) => {
  // GET /public/users/:id

  res.send({ status: 'OK', data: { id: req.params.id } });
});
