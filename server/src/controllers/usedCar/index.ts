import { Request, Response } from "express";
import { uid } from "uid";
import UsedCar from "../../models/UsedCar";
import User from "../../models/User";
import { IUsedCar, IUser } from "../../types";
import { Generic_Msg } from "../../utils/constant";

export const getUsedCars = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const usedCars: IUsedCar[] = await UsedCar.find();

    return res
      .status(200)
      .json({ message: Generic_Msg.Get_All, data: usedCars });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const getUsedCarById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;

    const usedCar: IUsedCar | null = await UsedCar.findById(id);

    if (!usedCar) {
      return res.status(404).json({ message: "Car not found", data: {} });
    }
    return res
      .status(200)
      .json({ message: Generic_Msg.Get_By_Id, data: usedCar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const addUsedCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      carBrand,
      carModel,
      ownership,
      price,
      kmsDriven,
      address,
      imageURL,
      description,
      condition,
      modification,
      negotiability,
      accidentHistory,
    } = req.body as Pick<
      IUsedCar,
      | "carBrand"
      | "carModel"
      | "ownership"
      | "price"
      | "kmsDriven"
      | "address"
      | "imageURL"
      | "description"
      | "condition"
      | "modification"
      | "negotiability"
      | "accidentHistory"
    >;

    const { id: creatorId } = (req as any)?.user;
    if (!creatorId)
      return res.status(401).json({ message: "Unauthorized access", data: {} });

    // Save Into Database
    const data: IUsedCar = new UsedCar({
      carBrand,
      carModel,
      ownership,
      price,
      kmsDriven,
      address,
      imageURL,
      description,
      condition,
      modification,
      negotiability,
      accidentHistory,
      createdBy: creatorId,
      slug: uid(),
    });

    // adding user info

    const user: IUser | null = await User.findById(creatorId);

    data["sellerName"] = user?.full_name;
    data["contactNumber"] = user?.contactNumber;
    data["socialMedia"] = user?.socialMedia;

    const addedUsedCar: IUsedCar | null = await data.save();

    return res
      .status(200)
      .json({ message: Generic_Msg.Add, data: addedUsedCar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const updateUsedCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const { body } = req;

    const updatedUsedCar: IUsedCar | null = await UsedCar.findByIdAndUpdate(
      { _id: id },
      body
    );

    if (!updatedUsedCar)
      return res.status(400).json({ message: "Car not found", data: {} });

    return res.status(200).json({
      message: Generic_Msg.Update,
      data: updatedUsedCar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const deleteUsedCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const deletedUsedCar: IUsedCar | null = await UsedCar.findByIdAndDelete(id);

    if (!deletedUsedCar) {
      return res.status(404).json({ message: "Car not found", data: {} });
    }
    return res.status(200).json({
      message: Generic_Msg.Delete,
      data: deletedUsedCar,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const getUsedCarByCurrentUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      user: { id },
    } = req as any;

    const usedCar: (IUsedCar | null)[] = await UsedCar.find({ createdBy: id });

    if (!usedCar) {
      return res.status(404).json({ message: "Car not found", data: {} });
    }
    return res
      .status(200)
      .json({ message: Generic_Msg.Get_By_Id, data: usedCar });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};
