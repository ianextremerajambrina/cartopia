const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    nombreTienda: {
        type: String,
        required: [true, 'Una tienda debe tener nombre']
    },
    ubicacion: {
        pais: {
            type: String,
            required: [true, 'Una tienda tiene un pais'],
        },
        direccion: {
            type: String,
            required: [true, 'Un concesionario tiene ubicacion fisica']
        },
        codigoPostal: {
            type: String,
            required: [true, 'Introduzca el CP de la tienda']
        },
        municipio: {
            type: String,
            required: [true, 'Introduzca el municipio del concesionario de coches']
        },
        comunidadAutonoma: {
            type: String,
            required: [true, 'Introduzca la comunidad autonoma del concesionario']
        }
    },
    // se almacena el id de cada cliente
    clientes: {
        type: [String],
        default: null
    },
    // se almacena el id de cada vehiculo
    vehiculos: {
        type: [String],
        default: null
    }
})

const Store = mongoose.model('Store',storeSchema);

module.exports = Store;