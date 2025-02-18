CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);

CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER NOT NULL,
  number VARCHAR(20) NOT NULL,
  CONSTRAINT fk_contact_id
    FOREIGN KEY(contact_id)
    REFERENCES contacts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);