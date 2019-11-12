module.exports.hideAttributes = (object, visibleAttributes) => {
  return visibleAttributes.reduce((previous, current) => {
    previous[current] = object[current]
    return previous
  }, {})
}
