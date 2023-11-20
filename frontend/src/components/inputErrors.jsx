import React from 'react'

const InputErrors = (formik) => {
  return (
    formik.touched && formik.error &&
    <span style={{ color: "red" }}>{formik.error}</span>
  )
}

export default InputErrors