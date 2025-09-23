const mongoose = require("mongoose");

const personSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Una persona debe tener nombre"],
    },
    identificacion: {
      type: String,
      required: [true, "Debe introducirse el DNI de la persona"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Una persona debe tener un email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Una persona debe tener una contraseña"],
      select: false, // La contraseña no se devuelve en las consultas
    },
    coches: {
      type: {
        alquilados: {
          type: [mongoose.Schema.ObjectId],
          ref: 'Car',
          default: [],
        },
        comprados: {
          type: [mongoose.Schema.ObjectId],
          ref: 'Car',
          default: [],
        },
      },
    },
    fechaRegistro: {
      type: Date,
      required: [true, "Una persona debe tener su fecha de registro"],
    },
    rol: {
      type: String,
      enum: ["Cliente", "Staff", "Manager"],
      default: "Cliente",
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
