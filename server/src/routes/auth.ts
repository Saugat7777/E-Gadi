import { Router } from "express";
import { loginUser, loginWithGoogle } from "../controllers/auth";

const router: Router = Router();

// auth
router.post("/login", loginUser);
router.post("/login/google", loginWithGoogle);

export default router;
