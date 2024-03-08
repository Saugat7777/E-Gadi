import { Router } from "express";
import { getCurrentUser, getCurrentUserAllData } from "../controllers/userData";

const router: Router = Router();

// auth
router.get("/current-user", getCurrentUser);
router.get("/current-user-allData", getCurrentUserAllData);
export default router;
