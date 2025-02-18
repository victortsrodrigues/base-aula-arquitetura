import { Request, Response } from "express";
import { CreateContactData } from "../protocols";
import { createNewContact, getAllContacts, getContact } from "../services/contact-service";

export async function getContacts(req: Request, res: Response) {
  const contacts = await getAllContacts();
  res.status(200).send(contacts);
}

export async function createContact(req: Request, res: Response) {
  const contactData = req.body as CreateContactData;
  await createNewContact(contactData);
  res.sendStatus(201);
}

export async function getSpecificContact(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
  }
  const contact = await getContact(id);
  res.send(contact);
}