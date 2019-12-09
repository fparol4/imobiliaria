const axios = require('../../config/axios-config');
const codeStatus = require('../utils/responseCodes');

module.exports.getHouses = async () => {

try {

    const response = await axios.get("/properties");
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

module.exports.getHouse = async (id) => {

try {

    const response = await axios.get(`/properties/${id}`);
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

