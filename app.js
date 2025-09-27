const express = require("express");
const app = express();

const carRouter = require('./routes/carRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const personRouter = require('./routes/personRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const storeRouter = require('./routes/storeRoutes');

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // Fecha de creación de la solicitud
  next();
});

app.use('/api/v1/cars', carRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/persons', personRouter);
app.use('/api/v1/rentals', rentalRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/stores', storeRouter);

module.exports = app;
