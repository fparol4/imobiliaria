class PromotionException extends Error {
  constructor (message = 'Invalid promotion') {
    super(message)
    this.name = 'PromotionException'
    this.status = 400
  }
}

class PromotionValueException extends Error {
  constructor (message = 'Invalid promotion value') {
    super(message)
    this.name = 'PromotionException'
    this.status = 400
  }
}

class PromotionDateException extends Error {
  constructor (message = 'Invalid promotion date') {
    super(message)
    this.name = 'PromotionException'
    this.status = 400
  }
}

module.exports = PromotionException
module.exports.PromotionValueException = PromotionValueException
module.exports.PromotionDateException = PromotionDateException
