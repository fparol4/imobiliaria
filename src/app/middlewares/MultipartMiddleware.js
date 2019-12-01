const Multiparty = require('multiparty')
const form = new Multiparty.Form()

module.exports = async (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    console.log(fields)
    if (err) throw err
  })
  next()
}
