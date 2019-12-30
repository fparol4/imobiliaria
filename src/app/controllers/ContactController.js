/** Models */
const { Contact } = require("../models");

/** Responses */
const ResponseHttpFactory = require("../factory/ResponseHttpFactory");

class ContactController {
  async store(req, res) {
    const { name, phone, houseId, houseCod, description } = req.body;

    console.log(req.body);

    try {
      let contactResult = await Contact.create({
        name: name,
        phone: phone,
        house_id: houseId,
        house_cod: houseCod,
        description: description
      });

      console.log(contactResult);

      return ResponseHttpFactory.genericResponse(
        res,
        200,
        "Contact created!",
        contactResult
      );
    } catch (error) {
      console.log(error);

      return ResponseHttpFactory.genericResponse(
        res,
        500,
        "Contact error!",
        error
      );
    }
  }

  async show(req, res) {
    try {
      return ResponseHttpFactory.genericResponse(
        res,
        200,
        "Contacts",
        await Contact.findAll()
      );
    } catch (error) {
      console.log(error);

      return ResponseHttpFactory.genericExceptionResponse(
        res,
        500,
        "Contact error!",
        error
      );
    }
  }
}

module.exports = new ContactController();
