const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    cliente: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person',
        required: [true, 'Se necesita un cliente para pagar']
    },
    tipoPago: {
        type: String,
        enum: ['compra','alquiler'],
        required: [true, 'Especifica el tipo de pago']
    },
    precio: {
        type: Number,
        required: [true, 'especifica lo que cuesta el pago']
    },
     transaccionTipo: { // 'compra' -> Car, 'alquiler' -> Transaction
         type: String,
         enum: ['Transaction', 'Car'],
         required: [true, 'Tipo de transaccion requerido']
     },
    transaccionRef: {
      type: mongoose.Schema.ObjectId,
      // Usaremos un `refPath` para hacer la referencia dinámica
      required: [true, "El pago debe estar asociado a una transacción"],
      refPath: 'transaccionTipo'
    },
},
{
    timestamps: true
})

const Payment = mongoose.model('Payment',paymentSchema);

module.exports = Payment;