import { Router } from "express";
import { loginUser } from "../controllers/auth";

const router: Router = Router();

// auth
router.post("/login", loginUser);

export default router;
