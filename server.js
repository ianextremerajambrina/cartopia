const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

// Configuramos la cadena de conexion a la base de datos
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() =>
    console.log('Conexion exitosa')
)

app.listen(process.env.PORT || 8000, (err) => {
    if (err) console.log(err)
    else console.log('Servidor arrancado en puerto: ',process.env.PORT)
})