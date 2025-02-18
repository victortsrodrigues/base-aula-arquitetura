import joi from "joi";
import { CreateContactData } from "../protocols";

const contactSchema = joi.object<CreateContactData>({
  fullname: joi.string().required(),
  email: joi.string().email().optional(),
  phones: joi.array().items().min(1).required(),
});

export default contactSchema;
