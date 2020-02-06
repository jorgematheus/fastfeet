import Router from 'express';
import multer from 'multer';
import MulterUpload from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';
import PackageDeliverymanController from './app/controllers/PackageDeliverymanController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancelledDeliveryController from './app/controllers/CancelledDeliveryController';

import AuthMiddleware from './app/middlewares/auth';


const routes = new Router();
const upload = multer(MulterUpload.index());
const uploadSignature = multer(MulterUpload.index('signatures'))

routes.post('/auth', SessionController.store);

// deliveryman acess
routes.get('/deliveryman/:id/packages', PackageDeliverymanController.index);
routes.get('/deliveryman/:id/deliveries', PackageDeliverymanController.show);
routes.put('/delivery/:idPackage/start', PackageDeliverymanController.start);
routes.put(
  '/delivery/:idPackage/end',
  uploadSignature.single('file'),
  PackageDeliverymanController.end
);

//delivery problems routes
routes.post('/delivery/:idPackage/problems', DeliveryProblemController.store);

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

//delivery problems routes
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post('/delivery/:idPackage/problems', DeliveryProblemController.store);

// files
routes.post('/files', upload.single('file'), FileController.store);

// package routes
routes.post('/packages', PackageController.store);

// cancelled package
routes.delete('/problem/:idProblem/cancel-delivery', CancelledDeliveryController.delete);


export default routes;
