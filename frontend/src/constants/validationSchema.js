import * as yup from 'yup';

export const VALIDATION_SCHEMA = yup.object({
  productName: yup
    .string('Enter your product name')
    .required('product name is required')
    .min(3, 'please enter more then 3 characters ')
    .max(20, 'please enter within 20 characters '),

  productPrice: yup
    .number('Enter your product price')
    .positive('enter positive product price')
    .required('product price is required'),

  productDescription: yup
    .string('Enter your product Description')
    .required('product description is required')
    .min(3, 'please enter more then 3 characters ')
    .max(500, 'please enter within 20 characters '),
});

export const INITIAL_VALUE = {
  productName: '',
  productPrice: '',
  productDescription: '',
};
