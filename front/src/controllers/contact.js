const axios = require("../../config/axios-config");
const codeStatus = require("../utils/responseCodes");

module.exports.sendContact = async (
  name,
  phone,
  houseId,
  houseCod,
  description
) => {
  try {
    const response = await axios.post("/contact", {
      name,
      phone,
      houseId,
      houseCod,
      description
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.errors);

    let response = {};
    response = codeStatus[error.response.data.status || 500];
    response.status = error.response.data.status || 500;
    response.original_message = error.response.data.message;
    response.index_status = String(response.status).slice(0, 1);
    response.error = true;

    return response;
  }
};
