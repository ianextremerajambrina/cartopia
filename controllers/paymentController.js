const express = require("express");
const Payment = require("../models/paymentModel");
const APIFeatures = require("../utils/apiFeatures");
const Transaction = require("../models/rentalModel");
const Person = require("../models/personModel");
const Car = require("../models/carModel");

exports.getAllPayments = async (req, res) => {
  try {
    const features = new APIFeatures(Payment.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const payments = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        payments,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los pagos",
    });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const id = req.params.paymentId;
    const payment = await Payment.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        payment,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos del pago",
    });
  }
};

// Funcion para /client/:clientId
exports.getPaymentsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const clientPayments = await Payment.find({ cliente: clientId });

    if (!clientPayments || clientPayments.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado datos",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        payments: clientPayments,
      },
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      status: "error",
      message: "Error en la búsqueda de datos",
    });
  }
};

// Funcion para "/client/:clientId/:paymentId"
exports.getPaymentByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const paymentId = req.params.paymentId;
    const clientPayment = await Payment.findOne({ cliente: clientId, _id: paymentId });

    if (!clientPayment) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado datos",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        payments: clientPayment,
      },
    });
  } catch (e) {
    console.log(e);

    res.status(400).json({
      status: "error",
      message: "Error en la búsqueda de datos",
    });
  }
};

// funcion para "/transaction/:transactionId"
exports.getPaymentsByTransactionId = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;

    const payments = await Payment.find({transaccionRef: transactionId});

    if (!payments) {
      return res.status(400).json({
        status: 'fail',
        message: 'No se encuentran pagos para esa referencia'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        payments
      }
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'fail',
      message: 'No se ha podido realizar la busqueda de pagos para esa referencia'
    })
  }
}

//TODO: Si tipoPago = alquiler verificamos que transaccionRef exista en Transaction antes del pago, permitiendo múltiples pagos sin duplicar Transactions
// TODO: 'compra' -> 'Car', 'alquiler' -> 'Transaction'. Si es una compra, ponemos transaccionTipo en 'Car', de lo contrario, 'Transaction'
exports.createPayment = async (req, res) => {
  try {
    // TODO: Dado que transactionRef es el id del coche en compras, debo comprobar el transactionRef del body
    const newPayment = await Payment.create(req.body);

    if (!newPayment) {
      return res.status(400).json({
        status: 'fail',
        message: 'Error al crear el pago'
      })
    }

    // Buscamos el coche en la transacción a traves de la referencia del pago

    if (newPayment.tipoPago === 'compra' && newPayment.transaccionTipo === 'Car') {
      const car = await Car.findById(newPayment.transaccionRef); // Encuentro el pago con el id del coche

      if (!car) {
        return res.status(404).json({
          status: 'fail',
          message: 'Coche no encontrado'
        })
      }

      const clientId = newPayment.cliente;
      const carId = car._id; // Id del coche

      if (car.estado === 'alquilado' || car.estado === 'vendido') {
        return res.status(400).json({
          status: 'fail',
          message: 'Coche ya alquilado o comprado'
        })
      }

      // Buscamos y actualizamos los datos del coche
      const carData = await Car.findByIdAndUpdate(carId,{propietarioTipo: 'Person', propietario: clientId, estado: 'vendido'},{new: true});

      if (!carData) {
        return res.status(400).json({
          status: 'fail',
          message: 'No se ha podido actualizar los datos'
        })
      }


      // Buscamos y actualizamos los datos de la persona
      const personData = await Person.findByIdAndUpdate(clientId,{$push: {'coches.comprados': carId}},{new: true})

      if (!personData) {
        return res.status(400).json({
          status: 'fail',
          message: 'No se ha podido actualizar los datos de la persona'
        })
      }

    }

    res.status(201).json({
      status: "success",
      data: {
        payment: newPayment,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear el pago",
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const paymentData = await Payment.findByIdAndUpdate(paymentId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        payment: paymentData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar el pago",
    });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const payment = await Payment.findByIdAndDelete(paymentId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el pago",
    });
  }
};

// Funcion para PATCH en /client/:clientId/:paymentId
exports.updatePaymentByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const paymentId = req.params.paymentId;

    // Verificar que el pago pertenece al cliente
    const payment = await Payment.findOne({ _id: paymentId, cliente: clientId });
    if (!payment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pago no encontrado para este cliente'
      });
    }

    const paymentData = await Payment.findByIdAndUpdate(paymentId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        payment: paymentData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar el pago",
    });
  }
};

// Funcion para DELETE en /client/:clientId/:paymentId
exports.deletePaymentByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const paymentId = req.params.paymentId;

    // Verificar que el pago pertenece al cliente
    const payment = await Payment.findOne({ _id: paymentId, cliente: clientId });
    if (!payment) {
      return res.status(404).json({
        status: 'fail',
        message: 'Pago no encontrado para este cliente'
      });
    }

    await Payment.findByIdAndDelete(paymentId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el pago",
    });
  }
};
