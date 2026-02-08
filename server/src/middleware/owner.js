const Note = require('../models/Note');

module.exports = async (req, res, next)=>{

    try{
        const note = await Note.findById(req.params.id)

        // If user types in an id, that didn't or no longer exists, return 404 status code
        if(!note){
           return res.status(404).json({error: 'Note not found'})
        }
        // This part is authorization
        if(note.user.toString() !== req.session.user._id){
            req.session.error = 'You are not authorized to perform this action';
           return res.status(403).json({ error: "You are not authorized" });
        }

        req.note = note;

        next();

    }catch(error){
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }

};