import { Request, Response } from "express";
import mongoose, { ObjectId, Schema, Types } from "mongoose";
import NewCar from "../../models/NewCar";
import { INewCar } from "../../types";
import { Generic_Msg } from "../../utils/constant";

export const getCarBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const carBrand = await NewCar.aggregate([
      {
        $group: {
          _id: "$carBrand", // Grouping by carBrand
        },
      },
      {
        $project: {
          _id: 0,
          carBrand: "$_id", // Reshaping the data
        },
      },
    ]);
    return res
      .status(200)
      .json({ message: Generic_Msg.Get_All, data: carBrand });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const getCarModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const carModel = await NewCar.aggregate([
      {
        $group: {
          _id: "$carModel", // Grouping by carBrand
        },
      },
      {
        $project: {
          _id: 0,
          carBrand: "$_id", // Reshaping the data
        },
      },
    ]);
    return res
      .status(200)
      .json({ message: Generic_Msg.Get_All, data: carModel });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const getAllCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cars = await NewCar.find(
      {},
      { carBrand: 1, carModel: 1, identity: 1 }
    );

    const combinedData = cars.map((car) => ({
      id: car._id,
      car: `${car.carBrand} ${car.carModel}`,
      identity: car.identity,
    }));

    return res
      .status(200)
      .json({ message: Generic_Msg.Get_All, data: combinedData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const getCarById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      params: { id },
    } = req;
    const car: INewCar | null = await NewCar.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Car not found", data: {} });
    }
    return res.status(200).json({ message: Generic_Msg.Get_By_Id, data: car });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};

export const compareCarByIdentity = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      body: { firstCar, secondCar },
    } = req;

    if (!firstCar || !secondCar)
      return res
        .status(405)
        .json({ message: "Please, provide car identity", data: [] });

    const car: INewCar[] | null = await NewCar.find({
      identity: { $in: [firstCar, secondCar] },
    });

    if (!car) {
      return res.status(404).json({ message: "Car not found", data: [] });
    }
    if (car.length < 2) {
      return res
        .status(405)
        .json({ message: "Please, provide correct identity", data: [] });
    }
    return res.status(200).json({ message: Generic_Msg.Get_By_Id, data: car });
  } catch (error) {
    return res
      .status(500)
      .json({ message: Generic_Msg.Server_Error, error: error });
  }
};
