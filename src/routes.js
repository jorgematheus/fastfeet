import Router from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ message: 'acesso' });
});

routes.post('/users', UserController.store);

routes.post('/auth', SessionController.store);

export default routes;
