import express, { json, Request, Response } from "express";
import contactRouter from "./routes/contact-router";

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("I'm OK!");
});

app.get("/numbers"), (req: Request, res: Response) => {
  return res.send([1, 2, 3]);
};

app.use(contactRouter);

export default app;
