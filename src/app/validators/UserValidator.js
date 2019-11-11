const ResponseMessages = require('../../locale/validators')
const Yup = require('yup')

const validationSchema = Yup.object().shape({
  first_name: Yup
    .string()
    .required(ResponseMessages.FirstNameRequired),

  last_name: Yup
    .string()
    .required(ResponseMessages.LastNameRequired),

  email: Yup
    .string()
    .email(ResponseMessages.EmailFormatInvalid)
    .required(ResponseMessages.EmailRequired),

  password: Yup
    .string()
    .min(6, ResponseMessages.PasswordMin)
    .required(ResponseMessages.PasswordRequired)

})

module.exports = async (req, res, next) => {
  const body = req.body

  /** @abortEarly Pega todos os erros de validação para throw */
  await validationSchema.validate(body, { abortEarly: false })

  /** @stripUnknown Remove todos os fields enviados e desconhecidos */
  req.body = validationSchema.cast(body, { stripUnknown: true })
  next()
}
