import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { INITIAL_VALUE, VALIDATION_SCHEMA } from '../constants/validationSchema';

import Products from '../api';
import ProductDisplay from '../components/productDisplay';
import ProductInputs from '../components/productInputs';

const Home = () => {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const getAllProducts = async () => {
    try {
      const response = await Products.getProducts()
      setProducts(response?.data)
    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const deleteProduct = async (productId) => {
    try {
      await Products.deleteProducts(productId)
      setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const addProduct = async (value) => {
    const response = await Products.addProducts({
      name: value.productName,
      price: value.productPrice,
      description: value.productDescription,
    })
    setLoadProduct(!loadProduct)
    return response
  }

  const editProduct = async (value) => {
    const response = await Products.editProducts(editingProduct._id, {
      name: value.productName,
      price: value.productPrice,
      description: value.productDescription,
    })
    setLoadProduct(!loadProduct)
    return response
  }

  const handleEdit = (product) => {
    setIsEditMode(!isEditMode)
    setEditingProduct(product)

    editFormik.setValues({
      productName: product.name,
      productPrice: product.price,
      productDescription: product.description,
    });
  }

  useEffect(() => {
    getAllProducts()
  }, [loadProduct])


  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values) => { addProduct(values) }
  });

  const editFormik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => { editProduct(values) },
  });
  return (
    <div>
      <ProductInputs formik={formik} />
      {products?.map((eachProduct) => (
        <div
          key={eachProduct._id}
        >
          <ProductDisplay
            product={eachProduct}
            deleteProduct={deleteProduct}
            editMode={handleEdit}
          />
          {/* edit inputs */}
          {(isEditMode && editingProduct._id === eachProduct._id) && (
            <ProductInputs formik={editFormik} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
