/*
  Warnings:

  - A unique constraint covering the columns `[fullname]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ContactOnGroups" (
    "id" SERIAL NOT NULL,
    "contactId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "ContactOnGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informations" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "informations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "informations_contactId_key" ON "informations"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_fullname_key" ON "contacts"("fullname");

-- AddForeignKey
ALTER TABLE "ContactOnGroups" ADD CONSTRAINT "ContactOnGroups_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactOnGroups" ADD CONSTRAINT "ContactOnGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informations" ADD CONSTRAINT "informations_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
