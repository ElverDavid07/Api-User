import { Router } from "express";
import { getUser, getUsers, registerUser, putUser, userLogin } from "../controllers/user.controller";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.get("/user",getUsers);
router.get("/user/:id",getUser);
router.post("/register",userValidator,registerUser)
router.post("/login",userLogin)
router.put("/user/:id",putUser)

export default router;
