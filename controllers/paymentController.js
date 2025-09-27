const express = require("express");
const Payment = require("../models/paymentModel");
const APIFeatures = require("../utils/apiFeatures");

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
    const id = req.params.id;
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

exports.createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);

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
    const paymentId = req.params.id;
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
    const paymentId = req.params.id;
    const payment = await Payment.findByIdAndDelete(paymentId);
    res.status(204).json({
        status: 'success',
        data: null
    })
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar el pago",
    });
  }
};