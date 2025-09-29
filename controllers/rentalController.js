const express = require("express");
const Rental = require("../models/rentalModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllRentals = async (req, res) => {
  try {
    const features = new APIFeatures(Rental.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const rentals = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        rentals,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los alquileres",
    });
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const id = req.params.rentalId;
    const rental = await Rental.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        rental,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos del alquiler",
    });
  }
};

exports.getRentalsByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const rentals = await Rental.find({ tienda: storeId });

    if (!rentals || rentals.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado alquileres por el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        rentals,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message:
        "No se han podido obtener los alquileres por el valor especificado",
    });
  }
};
exports.getRentalsByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;

    const rentals = await Rental.find({ vehiculo: carId });

    if (!rentals || rentals.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado alquileres por el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        rentals,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message:
        "No se han podido obtener los alquileres por el valor especificado",
    });
  }
};
exports.getRentalsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const rentals = await Rental.find({ cliente: clientId });

    if (!rentals || rentals.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado alquileres por el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        rentals,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message:
        "No se han podido obtener los alquileres por el valor especificado",
    });
  }
};

exports.createRental = async (req, res) => {
  try {
    const newRental = await Rental.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        rental: newRental,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear el alquiler",
    });
  }
};

exports.updateRental = async (req, res) => {
  try {
    const rentalId = req.params.rentalId;
    const rentalData = await Rental.findByIdAndUpdate(rentalId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        rental: rentalData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar el alquiler",
    });
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const rentalId = req.params.rentalId;
    const rental = await Rental.findByIdAndDelete(rentalId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el alquiler",
    });
  }
};
