const ResponseMessages = require('../../locale/validators/pt-br')
const Yup = require('yup')

const validationSchema = Yup.object().shape({
  first_name: Yup
    .string()
    .required(),

  last_name: Yup
    .string()
    .required(),

  email: Yup
    .string()
    .email()
    .required(),

  password: Yup
    .string()
    .min(6)

})

module.exports = validationSchema
