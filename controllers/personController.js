const express = require("express");
const Person = require("../models/personModel");
const Rental = require('../models/rentalModel');
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

    const rentals = await Rental.find({cliente: personId});

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