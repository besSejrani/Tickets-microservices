import express, { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

import jwt from "jsonwebtoken";

import { BadRequestError } from "../class/errors/badRequest";
import { check } from "express-validator";

// Middlewares
import { validation } from "../middlewares/validation";
import { Password } from "../class/hash/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    check("email", "Please provid a valid email").isEmail(),
    check("password", "Please provid a valid password").trim().notEmpty()
  ],
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        next(new BadRequestError("Invalid credentials"));
      }

      const match = await Password.compare(user.password, password);

      if (!match) {
        next(new BadRequestError("Invalid credentials"));
      }

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user?.id,
          email: user?.email
        },
        process.env.JWT_SECRET!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt
      };

      res.status(200).send(user);
    } catch (error) {
      console.log(error.message);
      new BadRequestError("Internal error");
    }
  }
);

export { router as signin };
