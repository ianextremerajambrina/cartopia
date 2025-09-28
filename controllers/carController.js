const express = require("express");
const Car = require("../models/carModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllCars = async (req, res) => {
  try {
    const features = new APIFeatures(Car.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const cars = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los coches",
    });
  }
};

exports.getAllCarsInStore = async (req, res) => {
  try {
    // TODO: Debe existir este parámetro en la ruta :storeId, que estará en req.query.params
    const features = new APIFeatures(Car.find(), req.query) // TODO: Usaremos APIFeatures para filtrar por el storeId
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const cars = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los coches",
    });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const id = req.params.carId;
    const car = await Car.findById(id);
    console.log(req.params);
    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos del coche",
    });
  }
};

exports.createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        car: newCar,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear el coche",
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const carData = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        car: carData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar el coche",
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findByIdAndDelete(carId);
    res.status(204).json({
        status: 'success',
        data: null
    })
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el coche",
    });
  }
};
