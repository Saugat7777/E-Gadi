import { Router } from "express";

import { getImage, uploadImage, uploadImages } from "../controllers/upload";
import upload from "../middleware/upload";

const router: Router = Router();

router.post("/image", upload.single("file"), uploadImage);
router.post("/mul-image", upload.array("file", 8), uploadImages);
router.get("/image/:filename", getImage);

export default router;
