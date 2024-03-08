import { Router } from "express";

import { getImage, uploadImage } from "../controllers/upload";
import upload from "../middleware/upload";

const router: Router = Router();

router.post("/image", upload.single("file"), uploadImage);
router.get("/image/:filename", getImage);

export default router;
