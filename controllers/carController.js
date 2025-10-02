const express = require("express");
const Car = require("../models/carModel");
const Store = require("../models/storeModel");
const Person = require("../models/personModel");
const APIFeatures = require("../utils/apiFeatures");

// Endpoint: GET /api/v1/cars
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

// Endpoint: GET /api/v1/cars/:carId
exports.getCarById = async (req, res) => {
  try {
    const id = req.params.carId;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "No se ha encontrado el coche",
      });
    }

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

// Endpoint: GET /api/v1/cars/owner/:ownerId/cars
// Funcion para '/owner/:ownerId'
exports.getCarsByOwnerId = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const cars = await Car.find({ propietario: ownerId });

    if (!cars || cars.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado coches",
      });
    }

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
      message: "No se han encontrado datos de coches",
    });
  }
};

// Endpoint: POST /api/v1/cars/owner/:ownerId/cars
// Funcion para POST en /owner/:ownerId
exports.createCarByOwnerId = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const carData = { ...req.body, propietario: ownerId };

    // TODO: Consultar que el ownerId tenga coches. De esta forma se puede saber si es Person o Store
    // TODO: Reforzar comprobaciones

    // Verificar que el propietario existe (Store o Person)
    const propietarioTipo = req.body.propietarioTipo || "Person"; // Asumir Person por defecto
    let ownerExists = false;
    if (propietarioTipo === "Person") {
      ownerExists = await Person.findById(ownerId);
    } else if (propietarioTipo === "Store") {
      ownerExists = await Store.findById(ownerId);
    }

    if (!ownerExists) {
      return res.status(404).json({
        status: "fail",
        message: "Propietario no encontrado",
      });
    }

    const newCar = await Car.create(carData);

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

// Endpoint: PATCH /api/v1/cars/:carId
exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const carData = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!carData) {
      return res.status(404).json({
        status: "fail",
        message: "Coche no encontrado",
      });
    }

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

// Endpoint: DELETE /api/v1/cars/:carId
exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findByIdAndDelete(carId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el coche",
    });
  }
};

// Funcion para /owner/:ownerId/cars/:carId
// TODO: Comprobar si se modifican datos que deban actualizarse en cascada
exports.updateCarByOwnerId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const ownerId = req.params.ownerId;

    const data = req.body;

    if (!ownerId || !carId) {
      return res.status(404).json({
        status: "fail",
        message: "Propietario o coche no encontrados",
      });
    }

    const cars = await Car.findOneAndUpdate(
      { propietario: ownerId, _id: carId },
      data,
      { new: true, runValidators: true }
    );

    if (!cars) {
      return res.status(400).json({
        status: "fail",
        message: "No se ha podido actualizar los datos del coche",
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        car: cars  
      }
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar los datos del coche",
    });
  }
};

// Funcion para /owner/:ownerId/cars/:carId
// TODO: Borrado en cascada para las colecciones con referencias
exports.deleteCarByOwnerId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const ownerId = req.params.ownerId;

    if (!ownerId || !carId) {
      return res.status(404).json({
        status: "fail",
        message: "Propietario o coche no encontrados",
      });
    }

    const cars = await Car.findOneAndDelete({
      propietario: ownerId,
      _id: carId,
    });

    if (!cars) {
      return res.status(400).json({
        status: "fail",
        message: "No se ha podido borrar el coche",
      });
    }

    return res.status(204).json({
      status: "success",
      data: null,
    });

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo borrar los datos del coche",
    });
  }
};
