const express = require("express");
const Person = require("../models/personModel");
const Transaction = require('../models/rentalModel');
const APIFeatures = require("../utils/apiFeatures");
const Car = require("../models/carModel");

exports.getAllPersons = async (req, res) => {
  try {
    const features = new APIFeatures(Person.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const persons = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        persons,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener las personas",
    });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const id = req.params.personId;
    const person = await Person.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        person,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos de la persona",
    });
  }
};

//Funcion para '/:personId/rentals'
exports.getRentalsByPersonId = async (req, res) => {
  try {
    const personId = req.params.personId;

    const person = await Person.findOne({_id: personId});

    if (!person) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se ha encontrado la persona'
      })
    }

    const rentals = await Transaction.find({cliente: personId});

    if (!rentals || rentals.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se ha encontrado los alquileres'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        rentals
      }
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'fail',
      message: 'No se pudo obtener los alquileres'
    })
  }
}

// Función para POST en /:personId/rentals
exports.createRentalByPersonId = async (req, res) => {
  try {

    // Buscamos la persona y validamos que exista
    const personId = req.params.personId;

    // Verificar que la persona existe
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({
        status: 'fail',
        message: 'Persona no encontrada'
      });
    }

    // Objeto con los datos del alquiler
    const rentalData = { ...req.body, cliente: personId };

    // Creación de nuevo alquiler
    const newRental = await Transaction.create(rentalData);

    if (newRental)  {
      person.coches.alquilados.push(newRental.vehiculo);
    }

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
}

// Funcion para :personId/cars
exports.getCarsByPersonId = async (req,res) => {
  try {

    const personId = req.params.personId;

    const personCars = await Person.findOne({_id: personId});

    if (!personCars) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se puede encontrar a la persona'
      })
    }

    const allCarIds = [...personCars.coches.alquilados, ...personCars.coches.comprados];

    const cars = await Car.find({_id: {$in: allCarIds}});

    if (!cars || cars.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Esta persona no tiene coches'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        cars
      }
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'fail',
      message: 'No se pudo obtener los coches'
    })
  }
}

// Función para POST en /:personId/cars
exports.createCarByPersonId = async (req, res) => {
  try {
    const personId = req.params.personId;

    // Verificamos que la persona exista

    const personData = await Person.findById(personId);

    if (!personData) {
      return res.status(404).json({
        status: 'fail',
        message: 'Persona no encontrada'
      });
    }

    // Objeto JSON con los datos del coche

    const carData = { ...req.body, propietario: personData._id, propietarioTipo: 'Person' };

    // Creamos el coche y añadimos el coche a la persona

    const newCar = await Car.create(carData);

    if (newCar) {
      personData.coches.comprados.push(carData._id);
    }

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

//Función para ('/store/:storeId'): Ver personas con relación a la tienda (storeId)
exports.getPersonsByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const persons = await Person.find({tienda: storeId});

    if (!persons || persons.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No se han encontrado datos'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        persons
      }
    })

  } catch (e) {
    console.log(e);

    res.status(400).json({
        status: 'error',
        message: 'No se ha podido obtener los datos de las personas'
      })

  }

}

// Función para POST en /store/:storeId
exports.createPersonByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const personData = { ...req.body, tienda: storeId, rol: req.body.rol || 'Staff' };

    // Verificar que la tienda existe
    const Store = require('../models/storeModel');
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tienda no encontrada'
      });
    }

    const newPerson = await Person.create(personData);

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

// TODO: Verificar que el rol no sea staff o manager. En caso contrario indicar error, y crear empleados en store
exports.createPerson = async (req, res) => {
  try {
    const newPerson = await Person.create(req.body);

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
      message: "No se pudo crear la persona",
    });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const personId = req.params.personId;
    const personData = await Person.findByIdAndUpdate(personId, req.body, {
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
      message: "No se pudo actualizar la persona",
    });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const personId = req.params.personId;
    const person = await Person.findByIdAndDelete(personId);
    res.status(204).json({
        status: 'success',
        data: null
    })
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar la persona",
    });
  }
};