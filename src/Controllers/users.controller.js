
const multer = require ('multer');
const multerConfig = require ('../../public/utils/multerConfig')
const passport= require('passport')
const User = require('../models/User')

const upload = multer (multerConfig).single('image');

const usersController = {};

usersController.fileUpload = (req, res, next) => {
    upload (req, res, function (error) {
        if (error ) {
            res.json ({message: error});
        }
        return next();
    })
}



usersController.renderSingUpForm = (req, res) => {
    res.render ('users/signup')


};

usersController.signup = async (req, res) => {
    const errors =[];
    const {name, address, age, phone, image, email, password, confirmPassword } = req.body;
    if(password != confirmPassword){
        errors.push ({text: 'Las contraseñas no coinciden'})
       
    }
    if(password.length < 4 ){
        errors.push({text:'La contraseña debe tener más de 4 caracteres'})
    }
    if(errors.length > 0) {
        res.render('/users/signup' ,{
            errors,
            name,
            address,
            age,
            phone,
            image,
            email,
            password,
            confirmPassword
        })
    } else {
        const emailUser= await User.findOne({email: email })
        if(emailUser) {
            req.flash('mensaje_error', 'El email ya está registrado');
            res.redirect('/users/signup');
        } else {
            const newUser =new User ({name, address, age, phone, image, email, password});
            newUser.password = await newUser.encryptPassword(password)
            if (req.file && req.file.filename ) {
                newUser.image = req.file.filename
            }
            await newUser.save();
            req.flash('mensaje_satisfactorio', `Bienvenido/a ${name}`)
            res.redirect('/users/signin');
        }
    }
    
};


usersController.renderSignInForm = (req, res) => {
    res.render ('users/signin')
};

usersController.signin = passport.authenticate('local', {
    failureRedirect:'/users/signin',
    successRedirect:'/productos',
    failureFlash: true
})

usersController.profile = async (req, res) => {
    const {name, address, age, phone, image, email} = req.body;
    const profileUser =new profileUser ({name, address, age, phone, image, email});

    if (req.file && req.file.filename ) {
        profileUser.image = req.file.filename
    }
     await profileUser.save();
    res.render ('users/profile')

}

usersController.logout =async (req, res )=> {
    
   
    await req.logout((err) => {
       
        if (err) return next(err);
    req.flash("mensaje_satisfactorio", 'Hasta Luego');
    res.redirect("/users/signin");
    });
}


module.exports =usersController