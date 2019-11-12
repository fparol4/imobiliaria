class RootController {
  async index (req, res) {
    return res.json({ ok: true })
  }
}

module.exports = new RootController()
