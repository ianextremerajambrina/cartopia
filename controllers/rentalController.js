const express = require("express");
const Transaction = require("../models/rentalModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllRentals = async (req, res) => {
  try {
    const features = new APIFeatures(Transaction.find(), req.query)
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
    const rental = await Transaction.findById(id);

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

    const rentals = await Transaction.find({ tienda: storeId });

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

// Función para POST en /store/:storeId
exports.createRentalByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const rentalData = { ...req.body, tienda: storeId };

    // Verificar que la tienda existe
    const Store = require('../models/storeModel');
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tienda no encontrada'
      });
    }

    const newRental = await Transaction.create(rentalData);

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

// Función para PATCH en /store/:storeId/:rentalId
exports.updateRentalByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const rentalId = req.params.rentalId;

    // Verificar que el alquiler pertenece a la tienda
    const rental = await Transaction.findOne({ _id: rentalId, tienda: storeId });
    if (!rental) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alquiler no encontrado en esta tienda'
      });
    }

    const rentalData = await Transaction.findByIdAndUpdate(rentalId, req.body, {
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

// Función para DELETE en /store/:storeId/:rentalId
exports.deleteRentalByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const rentalId = req.params.rentalId;

    // Verificar que el alquiler pertenece a la tienda
    const rental = await Transaction.findOne({ _id: rentalId, tienda: storeId });
    if (!rental) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alquiler no encontrado en esta tienda'
      });
    }

    await Transaction.findByIdAndDelete(rentalId);
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
exports.getRentalsByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;

    const rentals = await Transaction.find({ vehiculo: carId });

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

// Función para POST en /cars/:carId
exports.createRentalByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const rentalData = { ...req.body, vehiculo: carId };

    // Verificar que el coche existe
    const Car = require('../models/carModel');
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coche no encontrado'
      });
    }

    const newRental = await Transaction.create(rentalData);

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

// Función para PATCH en /cars/:carId/:rentalId
exports.updateRentalByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const rentalId = req.params.rentalId;

    // Verificar que el alquiler pertenece al coche
    const rental = await Transaction.findOne({ _id: rentalId, vehiculo: carId });
    if (!rental) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alquiler no encontrado para este coche'
      });
    }

    const rentalData = await Transaction.findByIdAndUpdate(rentalId, req.body, {
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

// Función para DELETE en /cars/:carId/:rentalId
exports.deleteRentalByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const rentalId = req.params.rentalId;

    // Verificar que el alquiler pertenece al coche
    const rental = await Transaction.findOne({ _id: rentalId, vehiculo: carId });
    if (!rental) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alquiler no encontrado para este coche'
      });
    }

    await Transaction.findByIdAndDelete(rentalId);
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
exports.getRentalsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const rentals = await Transaction.find({ cliente: clientId });

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

// Función para POST en /client/:clientId
exports.createRentalByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const rentalData = { ...req.body, cliente: clientId };

    // Verificar que el cliente existe
    const Person = require('../models/personModel');
    const person = await Person.findById(clientId);
    if (!person) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cliente no encontrado'
      });
    }

    const newRental = await Transaction.create(rentalData);

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

// Función para PATCH en /client/:clientId/:rentalId
exports.updateRentalByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const rentalId = req.params.rentalId;

    // Verificar que el alquiler pertenece al cliente
    const rental = await Transaction.findOne({ _id: rentalId, cliente: clientId });
    if (!rental) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alquiler no encontrado para este cliente'
      });
    }

    const rentalData = await Transaction.findByIdAndUpdate(rentalId, req.body, {
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

// Función para DELETE en /client/:clientId/:rentalId
exports.deleteRentalByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const rentalId = req.params.rentalId;

    // Verificar que el alquiler pertenece al cliente
    const rental = await Transaction.findOne({ _id: rentalId, cliente: clientId });
    if (!rental) {
      return res.status(404).json({
        status: 'fail',
        message: 'Alquiler no encontrado para este cliente'
      });
    }

    await Transaction.findByIdAndDelete(rentalId);
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

exports.createRental = async (req, res) => {
  try {
    const newRental = await Transaction.create(req.body);

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
    const rentalData = await Transaction.findByIdAndUpdate(rentalId, req.body, {
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
    const rental = await Transaction.findByIdAndDelete(rentalId);
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
