const express = require("express");
const Store = require("../models/storeModel");
const APIFeatures = require("../utils/apiFeatures");
const Car = require("../models/carModel");
const Person = require("../models/personModel");

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
      message: "No se pudieron obtener los datos de la tienda",
    });
  }
};

//funcion para :storeId/:carId
exports.getCarFromStore = async (req, res) => {
  try {
    const carId = req.params.carId;
    const storeId = req.params.storeId;

    const store = await Store.findOne({_id: storeId});

    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se ha encontrado la tienda'
      })
    }

    // Buscamos el coche

    const car = await Car.findOne({propietarioTipo: 'Store', propietario: storeId, _id: carId})

    if (!car) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se ha encontrado el coche'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        car
      }
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos de la tienda",
    });
  }
}

//funcion para :storeId/cars
exports.getCarsFromStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        status: "fail",
        message: "Tienda no encontrada",
      });
    }

    const cars = await Car.find({_id: {$in: store.vehiculos}});

    res.status(200).json({
      status: 'success',
      data: {
        cars
      }
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos de la tienda",
    });
  }
}

//funcion para :storeId/employees
exports.getEmployeesFromStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const store = await Store.findOne({_id: storeId});

    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'no se ha encontrado la tienda'
      }) 
    } 

    const employees = await Person.find({_id: {$in: store.empleados}});

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se han encontrado empleados'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        employees
      }
    })

  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: 'fail',
      message: 'No se pudieron obtener los datos de los empleados'
    })
  }
}

exports.createStore = async (req, res) => {
  try {
    const newStore = await Store.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        store: newStore,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear la tienda",
    });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const storeData = await Store.findByIdAndUpdate(storeId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        store: storeData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar la tienda",
    });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const store = await Store.findByIdAndDelete(storeId);
    res.status(204).json({
        status: 'success',
        data: null
    })
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar la tienda",
    });
  }
};

exports.createCarInStore = async (req,res) => {
   res.status(200).json({
    status: 'success',
    message: 'OK'
   })
}
exports.updateCarFromStore = async (req,res) => {
 res.status(200).json({
  status: 'success',
  message: 'OK'
 })
}
exports.deleteCarFromStore = async (req,res) =>{
 res.status(200).json({
  status: 'success',
  message: 'OK'
 })
}

exports.createEmployeeInStore = async (req,res) => {
 res.status(200).json({
  status: 'success',
  message: 'OK'
 })
}