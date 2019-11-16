const Moment = require('moment')

const manageProperties = (properties) => {
  return properties.reduce((prev, curr) => {
    if (curr.in_promotion) {
      prev.promotions.push(curr)
    } else if (Moment(new Date()).diff(curr.createdAt, 'days') >= process.env.NEW_PROPERTY_DAYS) {
      prev.new.push(curr)
    } else {
      prev.remaining.push(curr)
    }

    return prev
  }, { promotions: [], new: [], remaining: [] })
}

module.exports = { manageProperties }
