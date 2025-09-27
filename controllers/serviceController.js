const express = require("express");
const Service = require("../models/serviceModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllServices = async (req, res) => {
  try {
    const features = new APIFeatures(Service.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const services = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        services,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los servicios",
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await Service.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        service,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos del servicio",
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = await Service.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        service: newService,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear el servicio",
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceData = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        service: serviceData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar el servicio",
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findByIdAndDelete(serviceId);
    res.status(204).json({
        status: 'success',
        data: null
    })
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el servicio",
    });
  }
};