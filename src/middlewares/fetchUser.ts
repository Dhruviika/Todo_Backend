import { NextFunction, Request, Response } from "express";

var jwt = require("jsonwebtoken");

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
      };
    }
  }
}

export const fetchUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "kay123");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
