import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../errors/errorValidator";

const userValidator = [
  check("name")
    .custom((value: string) => {
      const trimmedValue = value.replace(/\s+/g, " ").trim();
      if (trimmedValue !== value) {
        throw new Error("El nombre no debe contener espacios adicionales.");
      }
      return true;
    })
    .trim()
    .isLength({ min: 3, max: 50 })
    .exists()
    .not()
    .isEmpty()
    .isString(),
  check("email").trim().isEmail().not().isEmpty(),
  check("password").trim().isString().isLength({ min: 4, max: 20 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { userValidator };
