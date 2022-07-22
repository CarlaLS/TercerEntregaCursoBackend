const {Router} = require('express') 
const router = Router();


const { renderSingUpForm, signup, renderSignInForm, signin, logout, fileUpload, profile } = require('../Controllers/users.controller')


router.get('/users/signup', renderSingUpForm);

router.post('/users/signup', fileUpload, signup);

router.post('/users/profile', profile)

router.get('/users/signin', renderSignInForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);



module.exports= router