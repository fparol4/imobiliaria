const ResponseMessages = require('../../locale/pt-br')
const Joi = require('@hapi/joi')

module.exports = Joi.object({
  full_name: Joi
    .string()
    .required(),

  password: Joi
    .string()
    .min(6)
    .max(18)
    .label(ResponseMessages.PasswordIsRequired),

  password_confirmation: Joi
    .ref('password'),

  email: Joi
    .string()
    .email()
    .label(ResponseMessages.EmailIsRequired),

  email_confirmation: Joi
    .ref('email'),

  status_id: Joi
    .number()
    .positive(),

  role_id: Joi
    .number()
    .positive()
})
