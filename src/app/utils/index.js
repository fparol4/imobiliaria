const hideAttributes = (object, visibleAttributes) => {
  return visibleAttributes.reduce((previous, current) => {
    previous[current] = object[current]
    return previous
  }, {})
}

const appendIfNotNull = (object, ...elements) => {
  elements.map(element => {
    if (!element) return
    object[element] = element
  })
  return object
}

module.exports = { hideAttributes, appendIfNotNull }
