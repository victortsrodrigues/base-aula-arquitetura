import { CreateContactData } from "../protocols";
import {
  insertContact,
  selectAllContacts,
  selectContactById,
} from "../repositories/contact-repository";

export async function getAllContacts() {
  const contacts = await selectAllContacts();
  return contacts;
}

export async function createNewContact(contactData: CreateContactData) {
  await insertContact(contactData);
}

export async function getContact(id: number) {
  const contact = await selectContactById(id);
  return contact;
}