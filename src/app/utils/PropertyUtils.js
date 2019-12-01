const Moment = require('moment')

exports.manageProperties = (properties) => {
  return properties.reduce((prev, curr) => {
    /**
     * Pega todas as propriedades e ordena elas por promocao, novas e restante
     * - Novas são as as propriedades que foram criadas a menos de 15 dias
     */
    if (curr.in_promotion) {
      prev.promotions.push(curr)
    } else if (Moment(new Date()).diff(curr.createdAt, 'days') <= Number(process.env.NEW_PROPERTY_DAYS)) {
      prev.new.push(curr)
    } else {
      prev.remaining.push(curr)
    }

    return prev
  }, { promotions: [], new: [], remaining: [] })
}
