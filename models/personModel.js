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
    telefono: {
      type: String,
      required: [true, "Introduzca su telefono para contacto"],
    },
    ubicacion: {
      pais: {
        type: String,
        required: [true, "Una persona vive en un pais"],
      },
      direccion: {
        type: String,
        required: [true, "Una persona tiene direccion fisica"],
      },
      codigoPostal: {
        type: String,
        required: [true, "Introduzca el CP de la persona"],
      },
      municipio: {
        type: String,
        required: [true, "Introduzca el municipio de la persona"],
      },
      comunidadAutonoma: {
        type: String,
        required: [true, "Introduzca la comunidad autonoma de la persona"],
      },
    },
    tienda: {
      // Si es empleado (manager o staff) al registrarse, asignar la tienda. 
      // Si no, por defecto null (puede ser cliente, pero hasta que no se registre o compre, no se le asocia la tienda)
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      default: null,
    },
    coches: {
      type: {
        alquilados: {
          type: [mongoose.Schema.ObjectId],
          ref: "Car",
          default: [],
        },
        comprados: {
          type: [mongoose.Schema.ObjectId],
          ref: "Car",
          default: [],
        },
      },
      _id: false,
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

const Person = mongoose.model("Person", personSchema, "persons");

// Pre-save hook to hash password
personSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = require("bcryptjs");
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare password
personSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = require("bcryptjs");
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = Person;
