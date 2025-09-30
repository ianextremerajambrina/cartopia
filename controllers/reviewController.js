const express = require("express");
const Review = require("../models/reviewModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllReviews = async (req, res) => {
  try {
    const features = new APIFeatures(Review.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const reviews = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener las reseñas",
    });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const id = req.params.reviewId;
    const review = await Review.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudieron obtener los datos de la reseña",
    });
  }
};

exports.getReviewsByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;

    const reviews = await Review.find({ coche: carId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado reseñas para el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se han podido obtener las reseñas por el valor especificado",
    });
  }
};

// Función para POST en /cars/:carId
exports.createReviewByCarId = async (req, res) => {
  try {
    const carId = req.params.carId;
    const reviewData = { ...req.body, coche: carId };

    // Verificar que el coche existe
    const Car = require('../models/carModel');
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        status: 'fail',
        message: 'Coche no encontrado'
      });
    }

    const newReview = await Review.create(reviewData);

    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear la reseña",
    });
  }
};
exports.getReviewsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const reviews = await Review.find({ cliente: clientId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado reseñas para el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se han podido obtener las reseñas por el valor especificado",
    });
  }
};

// Función para POST en /client/:clientId
exports.createReviewByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const reviewData = { ...req.body, cliente: clientId };

    // Verificar que el cliente existe
    const Person = require('../models/personModel');
    const person = await Person.findById(clientId);
    if (!person) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cliente no encontrado'
      });
    }

    const newReview = await Review.create(reviewData);

    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear la reseña",
    });
  }
};

exports.getReviewsByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const reviews = await Review.find({ tienda: storeId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado reseñas para el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se han podido obtener las reseñas por el valor especificado",
    });
  }
};

exports.getReviewByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const reviews = await Review.findOne({ tienda: storeId });

    if (!reviews) {
      return res.status(404).json({
        status: "fail",
        message: "No se han encontrado reseñas para el valor especificado",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        reviews,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se han podido obtener las reseñas por el valor especificado",
    });
  }
};

// Función para PATCH en /:storeId/:reviewId
exports.updateReviewByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const reviewId = req.params.reviewId;

    // Verificar que la reseña pertenece a la tienda
    const review = await Review.findOne({ _id: reviewId, tienda: storeId });
    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Reseña no encontrada en esta tienda'
      });
    }

    const reviewData = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        review: reviewData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar la reseña",
    });
  }
};

// Función para DELETE en /:storeId/:reviewId
exports.deleteReviewByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const reviewId = req.params.reviewId;

    // Verificar que la reseña pertenece a la tienda
    const review = await Review.findOne({ _id: reviewId, tienda: storeId });
    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'Reseña no encontrada en esta tienda'
      });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar la reseña",
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo crear la reseña",
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const reviewData = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        review: reviewData,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo actualizar la reseña",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndDelete(reviewId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: "No se pudo eliminar la reseña",
    });
  }
};
