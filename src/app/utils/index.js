
exports.hideAttributes = (object, visibleAttributes) => {
  return visibleAttributes.reduce((previous, current) => {
    previous[current] = object[current]
    return previous
  }, {})
}

exports.appendIfNotNull = (object, ...elements) => {
  elements.map(element => {
    if (!element) return
    object[element] = element
  })
  return object
}
