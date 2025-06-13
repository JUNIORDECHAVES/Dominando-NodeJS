import { Router } from "express";
import CustomersController from "./app/controllers/CustomersController.js";
import ContactsController from "./app/controllers/ContactsController.js";
import UsersController from "./app/controllers/UsersController.js";
import SessionsController from "./app/controllers/SessionsController.js"
import FilesController from "./app/controllers/FilesController.js"

import authMiddleware from "./app/middlewares/auth";

import multerConfig from "./config/multer.js";
import multer from "multer";

const routes = new Router();
const upload = multer(multerConfig);


// Sessions
routes.post("/sessions", SessionsController.create);

// controlar o acesso das rotas a partir desse ponto
routes.use(authMiddleware);

// Customers
routes.get("/customers", CustomersController.index);
routes.get("/customers/:id", CustomersController.show);
routes.post("/customers", CustomersController.create);
routes.put("/customers/:id", CustomersController.update);
routes.delete("/customers/:id", CustomersController.destroy);

// Contacts
routes.get("/customers/:customerId/contacts", ContactsController.index);
routes.get("/customers/:customerId/contacts/:id", ContactsController.show);
routes.post("/customers/:customerId/contacts/", ContactsController.create);
routes.put("/customers/:customerId/contacts/:id", ContactsController.update);
routes.delete("/customers/:customerId/contacts/:id", ContactsController.destroy);

// Users
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

// files
routes.post("/files", upload.single("file") , FilesController.create)

export default routes;
