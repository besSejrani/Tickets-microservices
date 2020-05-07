import express, { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

import jwt from "jsonwebtoken";

import { check } from "express-validator";
import { BadRequestError } from "../class/errors/badRequest";

// Middlewares
import { validation } from "../middlewares/validation";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    check("email", "Please enter a valid email").isEmail().isLength({ min: 4, max: 20 }),
    check("password", "Please enter a valid password").trim().isLength({ min: 4, max: 20 })
  ],
  validation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        next(new BadRequestError("Email in use"));
      }

      const newUser = User.build({ email, password });
      await newUser.save();

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email
        },
        process.env.JWT_SECRET!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt
      };

      res.status(201).send(newUser);
    } catch (error) {
      console.log(error.message);
      new BadRequestError("Internal error");
    }
  }
);

export { router as signup };
