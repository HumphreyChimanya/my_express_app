function checkRole(role) {
    return function(req, res, next){
        if (req.user && req.user.role === role){
            next();
        }
        else {
            res.status(400).send('Access denied: insufficient permissions');
        }
    }
}

module.exports = {checkRole}