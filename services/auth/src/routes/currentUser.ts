import express, { Request, Response, NextFunction } from "express";

import { currentUser } from "../middlewares/currentUser";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req: Request, res: Response, next: NextFunction) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
