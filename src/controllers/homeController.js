const Contato = require('../models/ContatoModel')

exports.index = async (req, res) => {
  const contatos = await Contato.selectContatos()
  res.render('index', {contatos});

};

