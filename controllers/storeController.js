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

// Endpoint: PATCH /api/v1/stores/:storeId/employees/:employeeId
exports.updateEmployeeFromStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const employeeId = req.params.employeeId;

    // Verificar que el empleado pertenece a la tienda
    const store = await Store.findOne({ _id: storeId, empleados: employeeId });
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'Empleado no encontrado en esta tienda'
      });
    }

    const personData = await Person.findByIdAndUpdate(employeeId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        person: personData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar el empleado",
    });
  }
};

// Endpoint: DELETE /api/v1/stores/:storeId/employees/:employeeId
exports.deleteEmployeeFromStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const employeeId = req.params.employeeId;

    const store = await Store.findOneAndUpdate(
      { _id: storeId, empleados: employeeId },
      { $pull: { empleados: employeeId } },
      { new: true }
    );

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
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el empleado",
    });
  }
};
//funcion para :storeId/:carId
exports.getCarFromStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const carId = req.params.carId;
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

// TODO: Asignar Car a la persona correspondiente de la tienda
exports.createCarInStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const carData = { ...req.body, propietario: storeId, propietarioTipo: 'Store' };

    // Verificar que la tienda existe
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tienda no encontrada'
      });
    }

    const newCar = await Car.create(carData);

    // Agregar el coche a la lista de vehiculos de la tienda
    store.vehiculos.push(newCar._id);
    await store.save();

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
}
exports.updateCarFromStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const carId = req.params.carId;

    // Verificar que el coche pertenece a la tienda
    const car = await Car.findOne({ _id: carId, propietario: storeId, propietarioTipo: 'Store' });
    if (!car) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coche no encontrado en esta tienda'
      });
    }

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
}
exports.deleteCarFromStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const carId = req.params.carId;

    // Verificar que el coche pertenece a la tienda
    const car = await Car.findOne({ _id: carId, propietario: storeId, propietarioTipo: 'Store' });
    if (!car) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coche no encontrado en esta tienda'
      });
    }

    await Car.findByIdAndDelete(carId);

    // Remover de la lista de vehiculos de la tienda
    const store = await Store.findById(storeId);
    store.vehiculos = store.vehiculos.filter(id => id.toString() !== carId);
    await store.save();

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el coche",
    });
  }
}

exports.createEmployeeInStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const personData = { ...req.body, tienda: storeId, rol: req.body.rol || 'Staff' || 'Manager' }; // TODO: Validar concienzudamente los roles en middleware
    // Verificar que la tienda existe
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tienda no encontrada'
      });
    }

    // añadimos a la persona con el id de la tienda

    const newPerson = await Person.create(personData);

    if (!newPerson) {
      return res.status(400).json({
        status: 'fail',
        message: 'No se ha podido crear a la persona'
      });
    }

    // Agregar el empleado a la lista de empleados de la tienda
    store.empleados.push(newPerson._id);
    await store.save();

    res.status(201).json({
      status: "success",
      data: {
        person: newPerson,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear el empleado",
    });
  }
}
