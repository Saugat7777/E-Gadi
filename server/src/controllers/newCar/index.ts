import { Request, Response } from "express";
import { uid } from "uid";
import NewCar from "../../models/NewCar";
import { INewCar } from "../../types";
import { Generic_Msg } from "../../utils/constant";
import { actionByUser } from "../../utils/help";

export const getNewCars = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newCars: INewCar[] = await NewCar.find();
    return res
      .status(200)
      .json({ message: Generic_Msg.Get_All, data: newCars });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const getNewCarById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const newCar: INewCar | null = await NewCar.findById(id);

    if (!newCar) {
      return res.status(404).json({ message: "Car not found", data: {} });
    }
    return res
      .status(200)
      .json({ message: Generic_Msg.Get_By_Id, data: newCar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const addNewCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      carBrand,
      carModel,
      bodyStyles,
      topSpeed,
      charging_0_to_100,
      seatingCapacity,
      price,
      range,
      imageURL,
      description,
      batteryCapacity,
      madeYear,
      groundClearance,
      extraFeatures,
    } = req.body as Pick<
      INewCar,
      | "carBrand"
      | "carModel"
      | "description"
      | "bodyStyles"
      | "range"
      | "topSpeed"
      | "charging_0_to_100"
      | "seatingCapacity"
      | "price"
      | "imageURL"
      | "batteryCapacity"
      | "madeYear"
      | "groundClearance"
      | "extraFeatures"
    >;

    const { id: creatorId } = (req as any)?.user;
    if (!creatorId)
      return res.status(401).json({ message: "Unauthorized access", data: {} });

    // Save Into Database
    const data = new NewCar({
      carBrand,
      carModel,
      bodyStyles,
      topSpeed,
      charging_0_to_100,
      seatingCapacity,
      price,
      range,
      imageURL,
      description,
      batteryCapacity,
      madeYear,
      groundClearance,
      extraFeatures,
      totalRating: 0,
      totalUserRated: [],
      rating: 0,
      createdBy: creatorId,
      identity: uid(),
    });

    const addedNewCar: INewCar | null = await data.save();

    return res
      .status(200)
      .json({ message: Generic_Msg.Add, data: addedNewCar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const updateNewCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;

    const updatedNewCar: INewCar | null = await NewCar.findByIdAndUpdate(
      { _id: id },
      body
    );

    if (!updatedNewCar)
      return res.status(400).json({ message: "Car not found", data: {} });

    return res.status(200).json({
      message: Generic_Msg.Update,
      data: updatedNewCar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const deleteNewCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const deletedNewCar: INewCar | null = await NewCar.findByIdAndDelete(id);

    if (!deletedNewCar) {
      return res.status(404).json({ message: "Car not found", data: {} });
    }
    return res.status(200).json({
      message: Generic_Msg.Delete,
      data: deletedNewCar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const rateNewCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const { rating: userRating, email } = req.body;

    if (!userRating || !email)
      return res.status(400).json({ message: "Select rating value", data: {} });

    const newCarData: INewCar | null = await NewCar.findById(id);
    if (!newCarData)
      return res.status(404).json({ message: "Car not found", data: {} });

    const { totalRating, totalUserRated, rating } = newCarData;

    if (totalUserRated.includes(email)) {
      return res
        .status(400)
        .json({ message: "Already rated this car !", data: {} });
    }

    totalUserRated.push(email);
    const accTotalRating = totalRating + userRating;
    const accRating = accTotalRating / totalUserRated?.length;

    const updatedNewCar: INewCar | null = await NewCar.findByIdAndUpdate(
      { _id: id },
      { totalUserRated, totalRating: accTotalRating, rating: accRating }
    );

    if (!updatedNewCar)
      return res.status(404).json({ message: "Car not found", data: {} });

    return res.status(200).json({
      message: "Thank you for rating car !",
      data: updatedNewCar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};
