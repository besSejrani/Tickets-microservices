import mongoose from "mongoose";

export const connection = async () => {
  try {
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
