const comparePassword = require('../helper/comparePassword')
const User = require('../models/user')

module.exports.logout = (req, res) => {
    try{
        delete req.session.userId
        delete req.session.userName
        delete req.session.userEmail

        console.log('User logged out!')
        return res.redirect('/')
    }
    catch(e){
        console.error('logout-error', error)
        req.flash('error', 'Logout Error!')
        return res.redirect('/logout')
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user) {
            console.log('User not found!')
            req.flash('error', 'Email tidak ditemukan!')
            return res.redirect('/')
        }

        const authenticated = comparePassword(password, user.password)

        if(!authenticated) {
            console.log('Password invalid!')
            req.flash('error', 'Password salah!')
            return res.redirect('/')
        }

        req.session.userId = user.id
        req.session.userName = user.name
        req.session.userEmail = user.email

        console.log('a user logged in.')
        return res.redirect('/')
    }
    catch (e) {
        console.error('login-error', e)
        req.flash('error', 'Login Error!')
        return res.redirect('/')
    }
}

exports.register = async (req, res) => {
    try {
        await new User(req.body).save()

        console.log('user registered')
        return res.redirect('/')
    } catch (error) {
        console.error('register-error', error)
        req.flash('error', 'Register Error!')
        return res.redirect('/')
    }
}