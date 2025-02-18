import { CreateContactData, Phone } from "../protocols";
import prisma from "../database";
// import { contacts, phones } from "@prisma/client";

// export type ContactWithPhones = contacts & { phones: phones[] };

export async function queries() {
  await prisma.contact.findMany({
    include: {
      more: true,
      phones: true,
    }
  });
  await prisma.contact.create({
    data: {
      fullname: "didi",
      more: {
        connectOrCreate: {
          where: {
            contactId: 1
          },
          create: {
            description: "didi"
          }
        }
      }
    }
  })
}

export async function selectAllContacts() {
  const contacts = await prisma.contact.findMany({
    include: {
      phones: true,
    },
  }); // findFirst ou findUnique

  // for (const contact of contacts) {
  //   const contactWithPhones: ContactWithPhones[] = [];

  //   const phones = await prisma.phone.findMany({
  //     where: { contactId: contact.id },
  //   });
  //   contactWithPhones.push({
  //     ...contact,
  //     phones,
  //   });
  // }
  return contacts;
}

export async function insertContact(contactData: CreateContactData) {
  const { id: contactId } = await createContact(contactData);
  await savePhonesFromContact(contactId, contactData.phones);
}

export async function createContact(contactData: CreateContactData) {
  const { fullname, email } = contactData;
  const contact = await prisma.contact.create({
    data: {
      fullname,
      email,
    },
  });

  return contact;
}

export async function savePhonesFromContact(contactId: number, phones: string[]) {
  const phonePromises = phones.map((phone) => {
    return prisma.phone.create({
      data: {
        contactId: contactId,
        number: phone,
      },
    });
  });
  await Promise.all(phonePromises);
}

export async function selectContactById(id: number) {
  const contact = await prisma.contact.findUnique({
    where: { id },
    include: {
      phones: true,
    },
  });
  return contact;
}