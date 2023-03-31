const User = require('../models/user');

module.exports.profile = function(req, res){
    res.render('user_profile',{
        title: "User Profile"
    });
}

module.exports.signIn = function (req, res){
    res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

module.exports.signUp = function (req, res){
    res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// sign up form for collecting data controller

module.exports.create = async function (req, res){
    try{
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        const userFound = await User.findOne({email: req.body.email})
            if(!userFound) {
                await User.create(req.body);
                return res.redirect('/users/sign-in');
            }
            return res.redirect('back');
    }catch (err){
        console.log(err);
    }
}

// to sign in and create session

module.exports.createSession = async function (req,res){
    const userFound = await User.findOne({email: req.body.email});
    try {
        if(userFound){
            if(userFound.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', userFound.id);
            return res.redirect('/users/profile');
        }
        return res.redirect('back');
    }catch (err){
        console.log(err);
    }
}