import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface userPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session?.jwt) {
      return next();
    }
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as userPayload;
    req.currentUser = payload;
    next();
  } catch (error) {}
};
