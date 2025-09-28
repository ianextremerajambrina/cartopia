const express = require("express");
const Person = require("../models/personModel");
const APIFeatures = require("../utils/apiFeatures");

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