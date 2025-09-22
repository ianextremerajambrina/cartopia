const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
    {
        marca: {
            type: String,
            required: [true, 'El coche debe tener marca'],
            trim: true
        },
        modelo: {
            type: String,
            required: [true, 'Un coche es de una marca y modelo concretos'],
            trim: true    
        },
        // Todo: El coche si no está alquilado, su dueño será el concesionario
        alquilado: {
            type: Boolean,
            default: false
        },
        // TODO: Alquilado y vendido deben ser excluyentes
        vendido: {
            type: Boolean,
            default: false
        },
        // Todo: Si el coche no está alquilado, será de X concesionario
        propietario: { 
            type: String,
            default: null,
        },
        potencia: {
            type: Number,
            required: [true,'Indica los CV del coche']
        },
        fechaFabricacion: {
            type: Date,
            required: [true, 'Indica la fecha de fabricacion del coche']
        },
        fechaCompra: {
            type: Date,
            required: [true, 'Indica la fecha de compra del coche']
        },
        // TODO: Añadir enfoque complementario?? (Si es nuevo, de segunda mano...)
        kmRecorridos: {
            type: Number,
            default: 0
        },
        precios: {
            type: {
                compra: Number,
                alquiler: Number,
            },
            required: [true, 'Especifica el precio de venta y alquiler del coche']
        }
    }
)

const Car = mongoose.model('Car',carSchema);