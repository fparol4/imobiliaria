const ResponseMessages = require('../../locale/validators')
const Yup = require('yup')

const validators = {
  store: Yup.object().shape({
    owner_id: Yup
      .number()
      .positive()
      .integer()
      .required(),

    value: Yup
      .number()
      .positive()
      .required(),

    area: Yup
      .number()
      .positive()
      .required(),

    dorms: Yup
      .number()
      .positive()
      .integer()
      .required(),

    animals: Yup
      .boolean()
      .required(),

    iptu: Yup
      .number()
      .positive()
      .required(),

    condominium: Yup
      .number()
      .positive()
      .required(),

    neighbourhood: Yup
      .string()
      .required(),

    city: Yup
      .string()
      .required(),

    description: Yup
      .string()
      .required(),

    operation: Yup
      .string()
      .required(),

    finality: Yup
      .string()
      .required(),

    garages: Yup
      .number()
      .positive()
      .integer()
      .required(),

    promotion_value: Yup
      .number()
      .positive(),

    promotion_date: Yup
      .date(),

    in_promotion: Yup
      .boolean()
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
