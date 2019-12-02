'use strict';
const { language } = require('../configurations');

module.exports = (selectedLanguage = undefined) => {
    let selected = selectedLanguage != undefined ? selectedLanguage : language.default;
    const path = String(selected).toLowerCase();
    const file = require(`./${path}.json`);

    return file;
}
