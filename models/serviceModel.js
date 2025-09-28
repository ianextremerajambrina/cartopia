const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    tipoServicio: {
        type: String,
        enum: ['mantenimiento','reparacion'],
        required: [true, 'Se debe especificar el tipo de servicio']
    },
    tecnico: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person',
        required: [true, 'Se necesita especificar al tecnico encargado']
    },
    precio: {
        type: Number,
        required: [true, 'Especifica el precio del servicio']
    },
    vehiculo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: [true, 'No puede haber servicio sin coche asociado']
    },
    tienda: {
        type: mongoose.Schema.ObjectId,
        ref: 'Store',
        required: [true, 'No puede haber servicio sin tienda asociada']
    }
},
{
    timestamps: true
})

const Service = mongoose.model('Service',serviceSchema);

module.exports = Service;