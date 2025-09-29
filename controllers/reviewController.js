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
exports.getReviewsByClientId = async (req, res) => {
  try {
    const clientId = req.params.clientId;

    const reviews = await Review.find({ cliente: clientId });

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
exports.getReviewsByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const reviews = await Review.find({ tienda: storeId });

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
