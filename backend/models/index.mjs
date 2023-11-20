import mongoose from 'mongoose';

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  createdOn: { type: Date, default: Date.now },
});
export const productModel = mongoose.model('products', productSchema);

const mongodbURI = process.env.MONGO_DB_URI;

mongoose.connect(mongodbURI);

mongoose.connection.on('connected', () => {
  //connected
  console.log('Mongoose is connected');
});

mongoose.connection.on('disconnected', () => {
  //disconnected
  console.log('Mongoose is disconnected');
  process.exit(1);
});

mongoose.connection.on('error', (err) => {
  //any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('app is terminating');
  mongoose.connection.close(() => {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});
