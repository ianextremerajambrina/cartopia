const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    marca: {
      type: String,
      required: [true, "El coche debe tener marca"],
      trim: true,
    },
    modelo: {
      type: String,
      required: [true, "Un coche es de una marca y modelo concretos"],
      trim: true,
    },
    estado: {
      type: String,
      enum: ["disponible", "alquilado", "vendido", "mantenimiento"],
      default: "disponible",
    },
    // Todo: Si el coche no está alquilado, será de X concesionario
    propietario: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Debe existir el id del propietario"],
      refPath: "propietarioTipo",
    },
    propietarioTipo: {
      type: String,
      enum: ["Store", "Person"],
      required: [true, "Debe especificarse el tipo de propietario"],
    },
    potencia: {
      type: Number,
      required: [true, "Indica los CV del coche"],
    },
    fechaFabricacion: {
      type: Date,
      required: [true, "Indica la fecha de fabricacion del coche"],
    },
    fechaCompra: {
      type: Date,
      required: [true, "Indica la fecha de compra del coche"],
    },
    // TODO: Añadir enfoque complementario?? (Si es nuevo, de segunda mano...)
    kmRecorridos: {
      type: Number,
      default: 0,
    },
    precios: {
      type: {
        compra: {
          type: Number,
          required: [true, "El coche debe tener precio de compra"],
        },
        alquiler: {
          type: Number,
          required: [true, "El coche debe tener un precio de alquiler"],
        },
      },
      //required: [true, 'Especifica el precio de venta y alquiler del coche']
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
