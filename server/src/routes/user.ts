import { Router } from "express";
import { getUsers, registerUser, updateUser } from "../controllers/user";

const router: Router = Router();

// auth
router.post("/user/register", registerUser);
router.put("/user/update/:id", updateUser);
router.get("/user", getUsers);

export default router;
