const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function (email, password, done){
        // Find user and establish the identity
       const findUser = await User.findOne({email: email});
        try{
                // if(err){
                //     console.log('Error in finding user --> Passport');
                //     return done(err);
                // }
                if(findUser.password != password){
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }
                return done(null, findUser);
        }
        catch(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
    }
));

// serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// deserializing the key to find the user from cookies
passport.deserializeUser(async function(id, done){
    const findUserById = await User.findById(id);
        try{
            return done(null, findUserById);
        }catch(err){
                console.log('Error in finding user --> Passport');
                return done(err);
        }
});

// check if the user authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}