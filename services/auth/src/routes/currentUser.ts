import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("hi there currentuser");
});

export { router as currentUserRouter };
