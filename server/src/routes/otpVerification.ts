import { Router } from "express";
import { generateOtp, verfiyOtp } from "../controllers/otpVerification";

const router: Router = Router();

// auth
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verfiyOtp);

export default router;
