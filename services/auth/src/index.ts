import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signin } from "./routes/signin";
import { signup } from "./routes/signup";
import { signout } from "./routes/signout";
import cookieSession from "cookie-session";

require("express-async-errors");

import { errorHandler } from "./middlewares/error";
import { NotFoundError } from "./class/errors/notFound";

import { connection } from "./model/db";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

connection();

app.use("/", currentUserRouter);
app.use("/", signin);
app.use("/", signup);
app.use("/", signout);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
