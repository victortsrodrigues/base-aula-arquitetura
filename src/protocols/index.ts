export type Contact = {
  id: number;
  fullname: string;
  email?: string;
  phones: Phone[];
};

export type Phone = {
  id: number;
  contact_id: number;
  number: string;
};

export type CreateContactData = Omit<Contact, "id" | "phones"> & {
  phones: string[];
};