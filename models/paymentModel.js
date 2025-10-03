const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Person",
      required: [true, "Se necesita un cliente para pagar"],
    },
    tipoPago: {
      type: String,
      enum: ["compra", "alquiler"],
      required: [true, "Especifica el tipo de pago"],
    },
    precio: {
      type: Number,
      required: [true, "especifica lo que cuesta el pago"],
    },
    transaccionTipo: {
      // 'compra' -> Car, 'alquiler' -> Transaction
      type: String,
      enum: ["Transaction", "Car"],
      required: [true, "Tipo de transaccion requerido"],
    },
    transaccionRef: {
      type: mongoose.Schema.ObjectId,
      // Usaremos un `refPath` para hacer la referencia dinámica
      required: [true, "El pago debe estar asociado a una transacción"],
      refPath: "transaccionTipo",
    },
    cuotasTotales: {
      type: Number,
      default: null,
    }, // Total de cuotas (e.g., 36 para 3 años)
    cuotaActual: {
      type: Number,
      default: null,
    }, // Número de cuota actual (1, 2, ...)
    cuotasPagadas: {
      type: Number,
      default: 1 // Compra entera -> cuota completa. Financiar -> pago inicial 1 cuota
    },
    fechaProximaCuota: {
      type: Date,
      default: null,
    }, // Fecha del próximo pago
    montoRestante: {
      type: Number,
      default: null,
    }, // Dinero pendiente
    financiado: {
      type: Boolean,
      default: false
    }, // Flag para financiaciones
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
