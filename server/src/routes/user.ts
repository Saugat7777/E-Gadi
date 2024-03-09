import { Router } from "express";
import {
  deleteUser,
  getUsers,
  registerUser,
  updateUser,
} from "../controllers/user";

const router: Router = Router();

// auth
router.post("/user/register", registerUser);
router.put("/user/update/:id", updateUser);
router.get("/user", getUsers);
router.delete("/user/delete/:id", deleteUser);

export default router;
