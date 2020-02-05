import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', SessionController.store);

routes.use(AuthMiddleware.store);

// user routes
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// recipient routes
routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);

// delivery routes
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// files
routes.post('/files', upload.single('file'), FileController.store);

// package routes
routes.post('/packages', PackageController.store);

export default routes;
