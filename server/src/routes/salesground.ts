import { Router } from "express";
import { loginUser } from "../controllers/auth";
import { getNewCarById, getNewCars } from "../controllers/newCar";
import { getUsedCarById, getUsedCars } from "../controllers/usedCar";

const router: Router = Router();

// new car
router.get("/new-car/all", getNewCars);
router.get("/new-car/get-by-id/:id", getNewCarById);

// used car
router.get("/used-car/all", getUsedCars);
router.get("/used-car/get-by-id/:id", getUsedCarById);

export default router;
