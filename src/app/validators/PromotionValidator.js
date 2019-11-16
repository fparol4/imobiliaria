const Yup = require('yup')

const validators = {
  store: Yup.object().shape({
    promotion_value: Yup
      .number()
      .required(),

    promotion_end: Yup
      .date()
      .required()
  })
}

module.exports = (validator = 'store') => {
  return async (req, res, next) => {
    const body = req.body

    /** @abortEarly Pega todos os erros de validação para throw */
    await validators[validator].validate(body, { abortEarly: false })

    /** @stripUnknown Remove todos os fields enviados e desconhecidos */
    req.body = validators[validator].cast(body, { stripUnknown: true })
    next()
  }
}
