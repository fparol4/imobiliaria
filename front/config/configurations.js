
const prod = require('./prod.json'),
dev = require('./dev.json');

//Pegando o Process de Desenvolvimento.
let configurations = process.env.NODE_ENV;

// Limpando 
configurations = String(configurations).replace(/'+/g, "");

//Carregando arquivo condizente com o perfil
retornoConfigs = configurations == "development" ? dev : prod;


module.exports = retornoConfigs;

