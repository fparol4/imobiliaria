 const axios = require('../../config/axios-config');
//const axios = require('axios');

module.exports.SendLogin = async (email, password) => {
   try {
    const response = await axios.post("/sessions", {
         email, password
      });

    return response.data;

   } catch (error) {
    //  console.log(error);
     return error.response.data;

   }



}
