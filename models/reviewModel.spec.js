const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Review = require('./reviewModel');

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

describe('Review Model', () => {
  it('should create a review with valid data', async () => {
    const reviewData = {
      cliente: new mongoose.Types.ObjectId(),
      valoracion: 5,
      coche: new mongoose.Types.ObjectId(),
      descripcion: 'Excellent car!'
    };

    const review = new Review(reviewData);
    const savedReview = await review.save();

    expect(savedReview.valoracion).toBe(5);
    expect(savedReview.descripcion).toBe('Excellent car!');
  });

  it('should fail to create a review without required cliente', async () => {
    const reviewData = {
      valoracion: 5,
      coche: new mongoose.Types.ObjectId(),
      descripcion: 'Excellent car!'
    };

    const review = new Review(reviewData);
    await expect(review.save()).rejects.toThrow();
  });

  it('should fail with valoracion out of range', async () => {
    const reviewData = {
      cliente: new mongoose.Types.ObjectId(),
      valoracion: 6,
      coche: new mongoose.Types.ObjectId(),
      descripcion: 'Excellent car!'
    };

    const review = new Review(reviewData);
    await expect(review.save()).rejects.toThrow();
  });
});