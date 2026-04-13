import type { RequestHandler } from 'express';

export default (): RequestHandler => (req, res) => {
  res.status(404).send({
    statusCode: 'ERROR_NOT_FOUND',
    message: 'Endpoint not found',
  });
};
