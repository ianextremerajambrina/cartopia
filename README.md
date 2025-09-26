# MongoDB Express Node Car Rental App

Welcome to this beginner-friendly project! This is a simple web application built with Node.js, Express, and MongoDB. It's designed to manage a car rental system, where you can handle cars, people, rentals, payments, reviews, services, and stores. Don't worry if you're new to programming – we'll explain everything step by step.

## What This App Does

Imagine a car rental company like Hertz or Avis. This app helps manage:
- **Cars**: Add, update, and track cars (like Toyota Corolla, BMW, etc.)
- **People**: Store information about customers and staff
- **Rentals**: Record when someone rents a car and for how long
- **Payments**: Handle money transactions for rentals or purchases
- **Reviews**: Let customers leave feedback on cars
- **Services**: Track maintenance or repairs on cars
- **Stores**: Manage different rental locations

The app uses a database (MongoDB) to store all this information and provides a web server (Express) to interact with it.

## Getting Started

### Prerequisites
Before you start, make sure you have these installed on your computer:
- **Node.js** (version 14 or higher) – This runs JavaScript on your computer. Download from [nodejs.org](https://nodejs.org/).
- **pnpm** (a package manager) – We use this to install libraries. Install it with `npm install -g pnpm` if you have npm.

### Installation
1. **Clone or download this project** to your computer.

2. **Open a terminal** (Command Prompt on Windows, Terminal on Mac/Linux) and go to the project folder:
   ```
   cd /path/to/your/project/mongodb-express-node
   ```

3. **Install the packages** we need. We already set this up, but here's what we installed:
   - `express`: A framework to build web servers in Node.js.
   - `mongoose`: A library to connect and work with MongoDB databases.
   - `dotenv`: Helps load secret settings (like database passwords) from a file.
   - `jest`: A testing framework to check if our code works correctly.
   - `mongodb-memory-server`: Creates a fake MongoDB database in memory for testing (so we don't mess up real data).
   - `supertest`: Helps test web routes (like API endpoints).

   Run this command to install them:
   ```
   pnpm install
   ```

4. **Set up environment variables**. Create a file called `.env` in the project root with:
   ```
   DATABASE=mongodb://localhost:27017/carRental
   DATABASE_PASSWORD=your_password_here
   PORT=8000
   ```
   Replace `your_password_here` with a real password. This file keeps secrets safe.

5. **Start the app**:
   ```
   node server.js
   ```
   You should see "Servidor arrancado en puerto: 8000" and "Conexion exitosa" in the terminal.

## How to Use the App

Right now, the app doesn't have a user interface (like a website). It's a "backend" API. You can test it using tools like Postman or curl, but since you're a beginner, let's focus on the code and testing.

### Project Structure
Here's what each folder contains:
- `controllers/`: Code that handles requests (like "get all cars").
- `models/`: Definitions of data structures (like what a "Car" looks like in the database).
- `routes/`: Defines URLs for the app (like `/cars` for car-related actions).
- `app.js`: Sets up the main Express app.
- `server.js`: Starts the server and connects to the database.
- `*.spec.js` files: Tests to check if the code works.

## Testing Your Code

Testing is like checking homework before turning it in. It ensures your code does what you expect. We use **Jest** for this.

### What is Jest?
Jest is a tool that runs tests automatically. A test is a small piece of code that checks if another piece of code works. For example:
- Does creating a new car in the database work?
- Does it fail if you forget to add a required field?

### What is MongoDB Testing?
MongoDB is our database. For testing, we don't want to change real data, so we use `mongodb-memory-server`. It creates a fake database in your computer's memory that disappears after tests. This is safe and fast!

### Running Tests
1. In the terminal, run:
   ```
   npm test
   ```
   This runs all `.spec.js` files.

2. You should see something like:
   ```
   Test Suites: 23 passed, 23 total
   Tests: 39 passed, 39 total
   ```

### Example Test
Here's a simple test from `models/carModel.spec.js`:

```javascript
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Car = require('./carModel');

let mongoServer;

beforeAll(async () => {
  // Start a fake database
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Clean up
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Car Model', () => {
  it('should create a car with valid data', async () => {
    const carData = {
      marca: 'Toyota',
      modelo: 'Corolla',
      propietario: new mongoose.Types.ObjectId(), // Fake ID
      propietarioTipo: 'Person',
      potencia: 150,
      fechaFabricacion: new Date('2020-01-01'),
      fechaCompra: new Date('2020-06-01'),
      precios: {
        compra: 20000,
        alquiler: 50
      }
    };

    const car = new Car(carData);
    const savedCar = await car.save();

    expect(savedCar.marca).toBe('Toyota'); // Check if it saved correctly
  });
});
```

This test:
- Creates a fake database.
- Tries to save a car.
- Checks if the car was saved with the right brand.

### Writing Your Own Tests
When you add new code, write tests:
1. Create a `.spec.js` file next to your code.
2. Use `describe` for groups of tests.
3. Use `it` for each test.
4. Use `expect` to check results.

Example for a new function:
```javascript
describe('My Function', () => {
  it('should return 4 when adding 2+2', () => {
    expect(2 + 2).toBe(4);
  });
});
```

## Next Steps
- Learn more about Express routes to add web pages.
- Add a frontend (like React) to make a user interface.
- Deploy the app to the internet (using Heroku or similar).

## Contributing
If you want to help:
1. Fork this project on GitHub.
2. Make changes.
3. Run tests with `npm test`.
4. Submit a pull request.

## License
This project is for learning. Feel free to use it!

---

Happy coding! If you have questions, ask. Remember, everyone starts as a beginner. 🚀