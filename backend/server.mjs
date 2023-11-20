import express from 'express';
import cors from 'cors';
import productApis from './apis/productApis.mjs';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(productApis);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
