const express = require("express");
const Service = require("../models/serviceModel");
const APIFeatures = require("../utils/apiFeatures");

// Endpoint: GET /api/v1/services
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

// Endpoint: GET /api/v1/services/:serviceId
exports.getServiceById = async (req, res) => {
  try {
    const id = req.params.serviceId;
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

// Endpoint: POST /api/v1/services
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

// Endpoint: PATCH /api/v1/services/:serviceId
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
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

// Endpoint: DELETE /api/v1/services/:serviceId
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Service.findByIdAndDelete(serviceId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el servicio",
    });
  }
};
// Funcion para /:storeId
exports.getServicesByStoreId = async (req, res) => {
  try {

    const storeId = req.params.storeId;

    const services = await Service.find({ tienda: storeId });

    if (services.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado servicios para esta tienda",
      });
    }

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
      message: "No se han podido obtener los servicios",
    });
  }
};

// Función para POST en /:storeId
exports.createServiceByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const serviceData = { ...req.body, tienda: storeId };

    // Verificar que la tienda existe
    const Store = require("../models/storeModel");
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({
        status: "fail",
        message: "Tienda no encontrada",
      });
    }

    const newService = await Service.create(serviceData);

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

// Endpoint: DELETE /api/v1/services/:storeId
exports.deleteServicesByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const result = await Service.deleteMany({ tienda: storeId });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron eliminar los servicios",
    });
  }
};

// Funcion para /cars/:carId
exports.getServicesByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;

    const services = await Service.find({ vehiculo: carId });

    if (!services || services.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado servicios para el coche",
      });
    }

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
      message: "No se han podido obtener los servicios",
    });
  }
};

// Función para POST en /cars/:carId
exports.createServiceByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const serviceData = { ...req.body, vehiculo: carId };

    // Verificar que el coche existe
    const Car = require("../models/carModel");
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        status: "fail",
        message: "Coche no encontrado",
      });
    }

    const newService = await Service.create(serviceData);

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

// Funcion para /technician/:technicianId
exports.getServicesByTechnicianId = async (req, res) => {
  try {
    const technicianId = req.params.technicianId;

    const services = await Service.find({ tecnico: technicianId });

    if (!services || services.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado servicios asignados al tecnico",
      });
    }

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
      message: "No se han podido obtener los servicios",
    });
  }
};

// Función para PATCH en /technician/:technicianId
exports.updateServiceByTechnicianId = async (req, res) => {
  try {
    const technicianId = req.params.technicianId;

    const serviceId = req.params.serviceId;

    const service = await Service.findOne({
      _id: serviceId,
      tecnico: technicianId,
    });

    if (!service) {
      return res.status(404).json({
        status: "fail",

        message: "Servicio no encontrado para este técnico",
      });
    }

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

// Similar para delete.

exports.deleteServiceByTechnicianId = async (req, res) => {
  try {
    const technicianId = req.params.technicianId;

    const serviceId = req.params.serviceId;

    const service = await Service.findOne({
      _id: serviceId,
      tecnico: technicianId,
    });

    if (!service) {
      return res.status(404).json({
        status: "fail",

        message: "Servicio no encontrado para este técnico",
      });
    }

    await Service.findByIdAndDelete(serviceId);

    res.status(204).json({
      status: "success",

      data: null,
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      status: "fail",

      message: "No se pudo eliminar el servicio",
    });
  }
};
