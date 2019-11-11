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

module.exports = async (req, res, next) => {
  const body = req.body

  /** @abortEarly Pega todos os erros de validação para throw */
  await validationSchema.validate(body, { abortEarly: false })

  /** @stripUnknown Remove todos os fields enviados e desconhecidos */
  req.body = validationSchema.cast(body, { stripUnknown: true })
  next()
}
