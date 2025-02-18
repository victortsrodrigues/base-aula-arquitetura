import prisma from "../src/database";

async function getOrCreatePoliceNumber() {
  await prisma.contact.upsert({
    where: {
      fullname: "Polícia",
    },
    update: {},
    create: {
      fullname: "Polícia",
      phones: {
        create: {
          number: "190",
        },
      },
    },
  });
}

getOrCreatePoliceNumber()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
