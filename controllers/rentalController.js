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
        status: 'success',
        data: null
    })
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el alquiler",
    });
  }
};