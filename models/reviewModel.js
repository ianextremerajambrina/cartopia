const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Person",
      required: [true, "Una reseña necesita de una persona"],
    },
    valoracion: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Se necesita una valoracion de 1 a 5"],
    },
    coche: {
      type: mongoose.Schema.ObjectId,
      ref: "Car",
      required: [true, "No puede existir reseña sin coche"],
    },
    descripcion: {
      type: String,
      required: [true, "Actualmente no se permiten reseñas sin texto"],
    },
    tienda: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: [true, "No puede haber review sin tienda asociada"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
