module.exports = (req, res, next)=>{
    if(!req.session || !req.session.user){
        req.session.error = 'Please log in or register to edit or delete note';
        console.log("isLogin error thrown")
        return res.status(401).json({error: "Please log in"});
    }

    next();
}