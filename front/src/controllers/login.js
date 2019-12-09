 const axios = require('../../config/axios-config');
 const  codeStatus = require('../utils/responseCodes');

module.exports.SendLogin = async (email, password) => {

   try {
    const response = await axios.post("/sessions", {
         email, password
      });
    return response.data;

   } catch (error) {
      console.log(error);

      let response = {};
      response = codeStatus[error.response.data.status || 500];
      response.status = error.response.data.status || 500;
      console.log(response.status);
      response.original_message = error.response.data.message;
      response.index_status = String(response.status).slice(0,1);
      response.error = true;

      return response;
   }



}
