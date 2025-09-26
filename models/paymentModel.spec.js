const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Payment = require('./paymentModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Payment Model', () => {
  it('should create a payment with valid data', async () => {
    const paymentData = {
      cliente: new mongoose.Types.ObjectId(),
      tipoPago: 'alquiler',
      precio: 500,
      transaccionRef: new mongoose.Types.ObjectId()
    };

    const payment = new Payment(paymentData);
    const savedPayment = await payment.save();

    expect(savedPayment.tipoPago).toBe('alquiler');
    expect(savedPayment.precio).toBe(500);
  });

  it('should fail to create a payment without required cliente', async () => {
    const paymentData = {
      tipoPago: 'alquiler',
      precio: 500,
      transaccionRef: new mongoose.Types.ObjectId()
    };

    const payment = new Payment(paymentData);
    await expect(payment.save()).rejects.toThrow();
  });

  it('should fail with invalid tipoPago enum', async () => {
    const paymentData = {
      cliente: new mongoose.Types.ObjectId(),
      tipoPago: 'invalid',
      precio: 500,
      transaccionRef: new mongoose.Types.ObjectId()
    };

    const payment = new Payment(paymentData);
    await expect(payment.save()).rejects.toThrow();
  });
});