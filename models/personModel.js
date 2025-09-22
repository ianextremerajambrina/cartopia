const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Una persona debe tener nombre']
    },
    identificacion: {
        type: String,
        required: [true, 'Debe introducirse el DNI de la persona'],
    },
    coches: {
        type: {
            alquilados: {
                type: Number,
                default: 0
            },
            comprados: {
                type: Number,
                default: 0
            }
        }
    },
    fechaRegistro: {
        type: Date,
        required: [true, 'Una persona debe tener su fecha de registro'],
    }
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;