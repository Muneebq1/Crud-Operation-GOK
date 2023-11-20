import InputErrors from './inputErrors';
import InputComponent from './input';

const ProductInputs = ({ formik }) => {
  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <InputComponent
        productId="productName"
        placeholder="Product Name"
        value={values.productName}
        onChange={handleChange}
      />
      <InputErrors touched={touched.productName} error={errors.productName} />

      <InputComponent
        productId="productPrice"
        placeholder="Product Price"
        type='number'
        value={values.productPrice}
        onChange={handleChange}
      />
      <InputErrors touched={touched.productPrice} error={errors.productPrice} />

      <InputComponent
        productId="productDescription"
        placeholder="Product Description"
        value={values.productDescription}
        onChange={handleChange}
      />
      <InputErrors touched={touched.productDescription} error={errors.productDescription} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductInputs;
