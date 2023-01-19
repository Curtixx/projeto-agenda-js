import validator from "validator";
export default class Login{
    constructor(form){
        this.form = document.querySelector(form)
    }
    init(){
        this.events()
    }
    events() {
        if(!this.form){
            return;
        } 
        this.form.addEventListener('submit', e => {
          e.preventDefault();
          this.validacao(e)
        });
    }

    validacao(e){
        const elemento = e.target
        const inputEmail = elemento.querySelector('input[name="email"]').value
        const inputSenha = elemento.querySelector('input[name="senha"]').value
        let erro = false

        
        if(!validator.isEmail(inputEmail)){
            alert('E-mail icorreto!')
            erro = true
        }
        if(inputSenha.length < 3 || inputSenha.length > 20){
            alert('A senha deve ter de 3 a 20 caracteres!')
            erro = true
        }

        if(!erro){
            e.submit()
        }
    }

}