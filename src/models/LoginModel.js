const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const LoginSchema = new mongoose.Schema({
  email: {type: String, required: true},
  senha: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async login(){
        this.validacao()
        if(this.errors.length > 0){
            return
        }
        this.user = await LoginModel.findOne({email: this.body.email})
        
        if(!this.user){
            this.errors.push("Usuário não criado!")
            return
        }
        

        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
            this.errors.push("Senha incorreta!")
            this.user = null
            return
        }
        
    }

    validacao(){
        this.cleanUp()
        
        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido');
        }

        if(this.body.senha.length < 3 || this.body.senha.length > 20) {
            this.errors.push('A senha precisa ter entre 3 e 20 caracteres.');
        }
    }
     async register(){

        this.validacao()
        
        if(this.errors.length > 0){
            return
        }
        await this.userExists()

        if(this.errors.length > 0){
            return
        }

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        this.user = await LoginModel.create(this.body)
        
       
    }
    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user){
            this.errors.push("Usuário ja criado!")
        }
        
    }
    cleanUp(){
        
        for(const chave in this.body){
            if(typeof this.body[chave] !== "string"){
                this.body[chave] = ""
            }
        }
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
        
    }
}

module.exports = Login;
