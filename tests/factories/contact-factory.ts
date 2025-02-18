import prisma from "database";
import { faker } from '@faker-js/faker';

export function createNewContactBody() {
  return {
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    phones: generatePhones(faker.number.int({ min: 1, max: 3 }))
  }
}

export async function createNewContact() {
  const { fullname, email, phones } = createNewContactBody();
  return await prisma.contact.create({
    data: {
      fullname,
      email,
      phones: {
        createMany: {
          data: phones.map((phone) => {
            return {
              number: phone,
            };
          })
        }
      }
    },
  });
}

function generatePhones(numberOfPhones: number) {
  const phones: string[] = [];
  for (let i = 0; i < numberOfPhones; i++) {
    phones.push(faker.phone.number());
  }
  return phones;
}