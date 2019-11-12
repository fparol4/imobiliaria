const ResponseMessages = require('../../locale/validators')
const Yup = require('yup')

const storeSchema = Yup.object().shape({
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

const updateSchema = Yup.object().shape({
  first_name: Yup
    .string(),

  last_name: Yup
    .string(),

  email: Yup
    .string()
    .email(ResponseMessages.EmailFormatInvalid),

  password: Yup
    .string()
    .min(6, ResponseMessages.PasswordMin),

  role_id: Yup
    .number()
    .integer()
    .positive()

})

module.exports.store = async (req, res, next) => {
  const body = req.body

  /** @abortEarly Pega todos os erros de validação para throw */
  await storeSchema.validate(body, { abortEarly: false })

  /** @stripUnknown Remove todos os fields enviados e desconhecidos */
  req.body = storeSchema.cast(body, { stripUnknown: true })
  next()
}

module.exports.update = async (req, res, next) => {
  const body = req.body

  /** @abortEarly Pega todos os erros de validação para throw */
  await updateSchema.validate(body, { abortEarly: false })

  /** @stripUnknown Remove todos os fields enviados e desconhecidos */
  req.body = updateSchema.cast(body, { stripUnknown: true })
  next()
}
