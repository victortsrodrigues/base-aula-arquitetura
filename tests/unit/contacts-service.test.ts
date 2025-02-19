import * as contactRepository from "../../src/repositories/contact-repository";
import prisma from "../../src/database";
import { getAllContacts, getToken } from "../../src/services/contact-service";

// beforeEach(async () => {
//   await prisma.phone.deleteMany();
//   await prisma.contact.deleteMany();
// });

beforeEach(() => {
  jest.clearAllMocks();
});

// // modulos externos
// jest.mock("uuid", () => {
//   return {
//     v4: () => {
//       return "token";
//     },
//   };
// });

// // modulos internos
// jest.mock("../../src/repositories/contact-repository", () => {
//   return {
//     selectAllContacts: async () => {
//       return new Promise((resolve, reject) => {
//         resolve(["teste"]);
//       });
//     },
//   };
// });

describe("Contacts Service Unit Testing", () => {
  it("should return all contacts", async () => {
    // jest.spyOn(contactRepository, "selectAllContacts").mockImplementation((): any => {
    //   return ["teste"];
    // });

    // jest
    //   .spyOn(contactRepository, "selectAllContacts")
    //   .mockImplementationOnce((): any => {
    //     return ["teste"];
    //   });

    const contactsMock = [
      {
        id: 1,
        fullname: "teste",
        email: "teste@example.com",
        favorite: false,
        phones: [
          {
            id: 1,
            number: "123456789",
            contactId: 1,
          },
        ],
      },
    ];

    jest
      .spyOn(contactRepository, "selectAllContacts")
      .mockResolvedValueOnce(contactsMock);

    const contacts = await getAllContacts();
    expect(contactRepository.selectAllContacts).toHaveBeenCalled();
    expect(contacts).toHaveLength(1);
    expect(contacts[0]).toEqual(contactsMock[0]);
  });
  // it("should return a token", async () => {
  //   const token = getToken();
  //   expect(token).toEqual({ token: "token1" });
  // });
});
