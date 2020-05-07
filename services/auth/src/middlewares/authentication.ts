import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../class/errors/notAuthorized";

export const Authentication = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
