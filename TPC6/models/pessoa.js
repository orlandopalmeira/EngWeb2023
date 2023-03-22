const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
  _id: String,
  CC: String,
  BI: String,
  animais: Object,
  destinos_favoritos: Object,
  marca_carro: String,
  atributos: Object,
  figura_publica_pt: Object, 
  desportos: Object, 
  idade: Number, 
  morada: Object, 
  nome: String,
  partido_politico: Object, 
  sexo: String, 
  profissao: String, 
  descricao: String, 
  religiao: String
});

module.exports = mongoose.model('pessoa', pessoaSchema);
