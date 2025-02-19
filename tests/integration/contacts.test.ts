import supertest from "supertest";
import app from "../../src/app";
import prisma from "../../src/database";
import {
  createNewContact,
  createNewContactBody,
} from "../factories/contact-factory";

const api = supertest(app);

beforeEach(async () => {
  // delete all data from db
  await prisma.phone.deleteMany();
  await prisma.contact.deleteMany();
});

describe("POST /contacts", () => {
  it("should create a new contact", async () => {
    const result = await api.post("/contacts").send(createNewContactBody());
    expect(result.status).toBe(201);
  });
});

describe("GET /contacts", () => {
  it("should return a specific contact", async () => {
    // arrange: criação de cenários
    const contact = await createNewContact();
    // act
    const { body } = await api.get(`/contacts/${contact.id}`);
    // asserts
    expect(body).toMatchObject({
      id: contact.id,
      fullname: contact.fullname,
      phones: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          number: expect.any(String),
          contactId: expect.any(Number),
        }),
      ]),
    });
  });

  it("should return all contacts", async () => {
    // arrange
    await createNewContact();
    await createNewContact();
    // act
    const { body } = await api.get("/contacts");
    // asserts
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          fullname: expect.any(String),
          phones: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              number: expect.any(String),
              contactId: expect.any(Number),
            }),
          ]),
        }),
      ])
    );
  });

  // it("should return status code 404 when contact is not found", async () => {
  //   // arrange
  //   const contactId = 2;
  //   // act
  //   const { status } = await api.get(`/contacts/${contactId}`);
  //   // asserts
  //   expect(status).toBe(404);
  // });
});

// {
//   "id": 1,
//   "fullname": "Polícia",
//   "email": null,
//   "favorite": false,
//   "phones": [
//     {
//       "id": 1,
//       "number": "190",
//       "contactId": 1
//     }
//   ]
// }

// import supertest from "supertest";
// import app from "../src/app";

// const api = supertest(app); // subir o app e fornecer uma api de acesso

// describe("GET /numbers", () => {
//   it("should return status 200 and a message", async () => {
//     const { status, body } = await api.get("/numbers");
//     expect(status).toBe(200);
//     // expect(body).toEqual([1, 2, 3]);
//     expect(body).toHaveLength(3);
//     expect(body).toContain(1);
//     expect(body).toEqual(expect.arrayContaining([1, 3]));
//   });
// });
