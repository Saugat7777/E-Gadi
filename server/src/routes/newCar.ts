import { Router } from "express";
import { loginUser } from "../controllers/auth";
import {
  addNewCar,
  deleteNewCar,
  getNewCarById,
  getNewCars,
  rateNewCar,
  updateNewCar,
} from "../controllers/newCar";

const router: Router = Router();

// auth
router.post("/new-car/add", addNewCar);
router.get("/new-car/all", getNewCars);
router.get("/new-car/get-by-id/:id", getNewCarById);
router.put("/new-car/update/:id", updateNewCar);
router.delete("/new-car/delete/:id", deleteNewCar);
router.put("/new-car/rate/:id", rateNewCar);

export default router;
