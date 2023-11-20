const InputComponent = ({ productId, placeholder, value, onChange, type }) => {
  return (
    <input
      id={productId}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
export default InputComponent