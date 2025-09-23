const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    nombreTienda: {
      type: String,
      required: [true, "Una tienda debe tener nombre"],
    },
    ubicacion: {
      pais: {
        type: String,
        required: [true, "Una tienda tiene un pais"],
      },
      direccion: {
        type: String,
        required: [true, "Un concesionario tiene ubicacion fisica"],
      },
      codigoPostal: {
        type: String,
        required: [true, "Introduzca el CP de la tienda"],
      },
      municipio: {
        type: String,
        required: [true, "Introduzca el municipio del concesionario de coches"],
      },
      comunidadAutonoma: {
        type: String,
        required: [true, "Introduzca la comunidad autonoma del concesionario"],
      },
    },
    vehiculos: {
      type: [mongoose.Schema.ObjectId],
      ref: "Car", 
      default: [], 
    },
    empleados: {
      type: [mongoose.Schema.ObjectId],
      ref: "Person", 
      default: [], 
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;