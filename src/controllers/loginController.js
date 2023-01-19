const { async } = require('regenerator-runtime')
const Login = require('../models/LoginModel')

exports.index = (req, res) =>{
    if(req.session.user){
        return res.render('login-logado')
    }
    return res.render('login')
}
exports.register = async (req,res) =>{
    try{
        const login = new Login(req.body)
        await login.register()
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
               return res.redirect('/login/index')
            })
            return
        }
    
        req.flash('success', 'Cadastro realizado com sucesso!')
        req.session.save(function(){
            return res.redirect('/login/index')
        })
    }catch(e){
        return res.render("404")
    }

}
exports.login = async (req,res) =>{
    try{
        const login = new Login(req.body)
        await login.login()        
        if(login.errors.length > 0){
            
            req.flash('errors', login.errors)
            req.session.save(function(){
                
               return res.redirect('/login/index')
            })
            
            return
        }
        
        req.flash('success', 'Login feito com sucesso!')
        req.session.user = login.user
        req.session.save(function(){
            return res.redirect('/login/index')
        })
    }catch(e){
        return res.render("404")
    }

}
exports.logout = (req,res) =>{
    req.session.destroy()
    return res.redirect('/login/index')
}