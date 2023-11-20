import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { INITIAL_VALUE, VALIDATION_SCHEMA } from '../constants/validationSchema';

import Products from '../api';
import ProductDisplay from '../components/productDisplay';
import ProductInputs from '../components/productInputs';

const Home = () => {
  const [products, setProducts] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const getAllProducts = async () => {
    try {
      const response = await Products.getProducts()
      setProducts(response?.data?.data)
    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      await Products.deleteProducts(id)
      setLoadProduct(!loadProduct)

    } catch (error) {
      console.log("error in getting all products", error);
    }
  }

  const addProduct = (value) => {
    const response = Products.addProducts({
      name: value.productName,
      price: value.productPrice,
      description: value.productDescription,
    })
    setLoadProduct(!loadProduct)
    return response
  }

  const editProduct = (value) => {
    const response = Products.editProducts(editingProduct._id, {
      name: value.productName,
      price: value.productPrice,
      description: value.productDescription,
    })
    setLoadProduct(!loadProduct)
    return response
  }

  const editMode = (product) => {
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
    onSubmit: async (values) => {
      try {
        await addProduct(values);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const editFormik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        await editProduct(values);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });
  return (
    <div>
      <ProductInputs formik={formik} />
      {products.map((eachProduct) => (
        <div
          key={eachProduct._id}
        >
          <ProductDisplay
            product={eachProduct}
            deleteProduct={deleteProduct}
            editMode={editMode}
          />
          {(isEditMode && editingProduct._id === eachProduct._id) && (
            <ProductInputs formik={editFormik} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
