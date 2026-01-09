module.exports = (req, res, next)=>{
    if(!req.session || !req.session.user){
        // req.session.error = 'Please log in or register. You will be redirected';
        return res.status(401).json({error: "Please log in"});
    }

    next();
}