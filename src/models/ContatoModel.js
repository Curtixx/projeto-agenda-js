const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: {type: String, required: false, default: ""},
  email: {type: String, required: false, default: ""},
  telefone: {type: String, required: true},
  data: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body = body
    this.errors = []
    this.contato = null
}

Contato.selectId = async (id) =>{
    if(typeof id !== 'string'){
        return
    }
    const contato = await ContatoModel.findById(id)
    return contato
}

Contato.prototype.edit = async function(id){
    if(typeof id !== 'string'){
        return
    }
    this.validacao()

    if(this.errors.length > 0){
        return
    }
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
}

Contato.prototype.register = async function(){
    this.validacao()    

    if(this.errors.length > 0){
        return
    }
    this.contato = await ContatoModel.create(this.body)
}
Contato.prototype.validacao = function(){
    this.cleanUp()
    
    if(this.body.email && !validator.isEmail(this.body.email)){
        this.errors.push('E-mail inválido');
    }
    if(!this.body.nome){
        this.errors.push("O contato precisa de um nome!")
    }
    if(!this.body.telefone){
        this.errors.push("O contato precisa de um telefone!")
    }
    if(!this.body.email && !this.body.telefone){
        this.errors.push("O contato precisa de um telefone e email!")
    }

}
Contato.prototype.cleanUp = function(){
        
    for(const chave in this.body){
        if(typeof this.body[chave] !== "string"){
            this.body[chave] = ""
        }
    }
    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    }
    
}

Contato.selectContatos = async () =>{
    const contatos = await ContatoModel.find().sort({data: -1})
    return contatos
}
Contato.delete = async (id) =>{
    if(typeof id !== 'string'){
        return
    }
    const contato = await ContatoModel.findOneAndDelete({_id: id})
    return contato
}


module.exports = Contato;
