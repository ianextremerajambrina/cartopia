const express = require("express");
const Store = require("../models/storeModel");
const APIFeatures = require("../utils/apiFeatures");
const Car = require("../models/carModel");
const Person = require("../models/personModel");

// Endpoint: GET /api/v1/stores
exports.getAllStores = async (req, res) => {
  try {
    const features = new APIFeatures(Store.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const stores = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        stores,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener las tiendas",
    });
  }
};

// Endpoint: GET /api/v1/stores/:storeId
exports.getStoreById = async (req, res) => {
  try {
    const id = req.params.storeId;
    const store = await Store.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        store,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar los datos de la persona",
    });
  }
};

// Endpoint: DELETE /api/v1/stores/:storeId/employees/:employeeId
exports.deleteEmployeeFromStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const employeeId = req.params.employeeId;

    const store = Store.findOneAndDelete({
      _id: storeId,
      $in: { empleados: employeeId },
    });

    if (!store) {
      return res.status(404).json({
        status: "fail",
        message: "No se ha encontrado la tienda o el empleado",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });

    const employees = store.employees;
  } catch (e) {
    console.log(e);
  }
};
