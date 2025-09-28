const express = require("express");
const Store = require("../models/storeModel");
const APIFeatures = require("../utils/apiFeatures");

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