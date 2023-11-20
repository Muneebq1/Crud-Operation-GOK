import express from 'express';
import { productModel } from '../models/index.mjs';

const router = express.Router();

router.post('/product', async (req, res) => {
  const body = req.body;

  if (!body.name || !body.price || !body.description) {
    return res.status(400).send({
      message: 'required parameters missing',
    });
  }
  try {
    const product = await productModel.create({
      name: body.name,
      price: body.price,
      description: body.description,
    });
    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).send(products);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/product/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedData = await productModel.deleteOne({ _id: id });
    if (deletedData.deletedCount !== 0) {
      return res.status(200).send({
        message: 'Product has been deleted successfully',
      });
    } else {
      return res.status(404).send({
        message: 'No Product found with this id: ' + id,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Server error',
    });
  }
});

router.put('/product/:id', async (req, res) => {
  const body = req.body;
  const id = req.params.id;

  if (!body.name || !body.price || !body.description) {
    return res.status(400).send({
      message: 'required parameter missing. example',
    });
  }
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    return res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
  }
});
export default router;
