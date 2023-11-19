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

mongoose.connection.on('connected', function () {
  //connected
  console.log('Mongoose is connected');
});

mongoose.connection.on('disconnected', function () {
  //disconnected
  console.log('Mongoose is disconnected');
  process.exit(1);
});

mongoose.connection.on('error', function (err) {
  //any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {
  console.log('app is terminating');
  mongoose.connection.close(function () {
    console.log('Mongoose default connection closed');
    process.exit(0);
  });
});
