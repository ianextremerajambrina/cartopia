const mongoose = require('mongoose');

const rentalSchema = mongoose.Schema({
    tienda: {
        type: String
    },
    cliente: {
        type: String,
    },
    vehiculo: {
        type: String
    }
})