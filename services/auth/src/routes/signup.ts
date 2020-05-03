import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../class/errors/databaseConnection";
import { RequestValidationError } from "../class/errors/requestValidation";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    check("email", "Please enter a valid email").isEmail().isLength({ min: 4, max: 20 }),
    check("password", "Please enter a valid password").trim().isLength({ min: 4, max: 20 })
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new DatabaseConnectionError();

    const { email, password } = req.body;
    res.json({ email, password });
  }
);

export { router as signup };
