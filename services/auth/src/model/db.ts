import mongoose from "mongoose";
import { BadRequestError } from "../class/errors/badRequest";

export const connection = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new BadRequestError("Baka, you forogot JWT_SECRET env");
    }

    await mongoose.connect("mongodb://mongodb-service:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`connected to database`);
  } catch (error) {
    console.error(error);
  }
};
