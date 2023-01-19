const { async } = require('regenerator-runtime')
const { use } = require('../../routes')
const Contato = require('../models/ContatoModel')

exports.index = (req, res) =>{
    res.render('contato', {contato: {}})
}
exports.register = async (req, res) =>{
    try{
        const contato = new Contato(req.body)
        await contato.register()
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(()=>{
            res.redirect('/contato/index')
            })
        return
        }

        req.flash('success', "Contato criado!")
        req.session.save(()=>{
        res.redirect(`/contato/index/${contato.contato._id}`)
        })
        return
    }catch(e){
        return redirect('404')
    }
    
}
exports.editIndex = async (req, res) =>{
    if(!req.params.id){
        return res.redirect('404')
    }
    
    const contato = await Contato.selectId(req.params.id)
    if(!contato){
        return res.redirect('404')
    }
    res.render('contato',{contato})
}
exports.edit = async (req, res) =>{
    try{
        if(!req.params.id){
            return res.redirect('404')
        }
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(()=>{
            res.redirect('/contato/index')
            })
        return
        }
    
        req.flash('success', "Contato alterado criado!")
        req.session.save(()=>{
        res.redirect(`/contato/index/${contato.contato._id}`)
        })
        return
    }catch(e){
        console.log(e)
        res.render('404')
    }

}
exports.delete = async (req,res) =>{
    if(!req.params.id){
        return res.redirect('404')
    }
    
    const contato = await Contato.delete(req.params.id)
    if(!contato){
        return res.redirect('404')
    }
    req.flash('success', "Contato deletado!")
    req.session.save(()=>{
        res.redirect('/')
    })
    return
    
}