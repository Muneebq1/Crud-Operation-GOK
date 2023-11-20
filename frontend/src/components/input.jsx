const InputComponent = ({ productId, placeholder, value, onChange, type }) => {
  return (
    <input
      style={{ margin: "10px" }}
      id={productId}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
export default InputComponent