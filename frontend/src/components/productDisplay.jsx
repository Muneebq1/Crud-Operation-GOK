

const ProductDisplay = ({ product, deleteProduct, editMode }) => (
  <div key={product._id} style={{ border: "1px solid black", padding: 10, margin: 10, borderRadius: 15 }}>
    <h2>{product.name}</h2>
    <h5>{product.price}</h5>
    <p>{product.description}</p>
    <button onClick={() => deleteProduct(product._id)}>delete</button>
    <button onClick={() => editMode(product)}>edit</button>
  </div>
);

export default ProductDisplay;