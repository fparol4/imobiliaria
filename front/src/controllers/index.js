const axios = require('../../config/axios-config');


const PegarItens = async () => {
    const response = await axios;
    return response.data;
}

module.exports = {
    PegarItens
}