const router = express.Router();
const session = require('express-session');
const {check, validationResult} = require('express-validator');

const isLogin = require('../middleware/isLogin');
const owner = require('../middleware/owner');

// user log 
// router.get('auth/login', (req,res)=>{
//     if(req.session.user) return
// })
router.post('auth/login/',
    check('username').notEmpty().withMessage('Enter username or email'),
    check('username').isEmail().withMessage('Invalid Email Entered')
)