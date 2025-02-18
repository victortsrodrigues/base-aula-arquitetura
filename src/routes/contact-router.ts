import { Router } from "express";
import { validateSchema } from "../middleware/schema-middleware";
import contactSchema from "../schemas";
import { createContact, getContacts, getSpecificContact } from "../controllers/contact-controller";


const contactRouter = Router();

contactRouter.get("/contacts", getContacts);
contactRouter.post("/contacts", validateSchema(contactSchema), createContact);
contactRouter.get("/contacts/:id", getSpecificContact);

export default contactRouter;