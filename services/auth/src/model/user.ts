import mongoose from "mongoose";

interface UserModel extends mongoose.Model<any> {
  build(user: User): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model<any, UserModel>("User", userSchema);

//===========================================================================

//Mongoose and typescript doesn't work very well
interface User {
  email: String;
  password: String;
}

userSchema.statics.build = (user: User) => {
  return new User(user);
};

//===========================================================================

export { User };
