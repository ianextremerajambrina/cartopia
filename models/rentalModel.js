const mongoose = require("mongoose");

const rentalSchema = mongoose.Schema(
  {
    tienda: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: [true, "Un coche se alquila/compra en una tienda"],
    },
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Person",
      required: [true, "Un coche es alquilado/comprado por un cliente"],
    },
    vehiculo: {
      type: mongoose.Schema.ObjectId,
      ref: "Car",
      required: [true, "Se necesita la referencia al coche para el alquiler"],
    },
    estado: {
      type: String,
      enum: ["reservado", "activo", "devuelto", "cancelado"],
      default: "reservado",
    },
    fechaInicio: {
      type: Date,
      required: [true, "Un alquiler debe tener una fecha de inicio"],
    },
    fechaFin: {
      type: Date,
      required: [true, "Un alquiler debe tener una fecha de fin"],
    },
    fechaDevolucion: {
      type: Date,
      default: null, // Opcional, se establece cuando el coche es devuelto
    },
    precioTotal: {
      type: Number,
      required: [true, "Un alquiler debe tener un precio total"],
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;