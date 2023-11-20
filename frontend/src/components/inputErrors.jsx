import React from 'react'

const InputErrors = (formik) => {
  return (
    <span style={{ color: "red" }}>{formik.error}</span>
  )
}

export default InputErrors