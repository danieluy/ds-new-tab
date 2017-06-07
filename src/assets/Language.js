const en = require('./lang_en');
const es = require('./lang_es');

const getLang = (lang) => {
  return lang === 'es' ? es : en;
}

module.exports = {
  getLang: getLang
}