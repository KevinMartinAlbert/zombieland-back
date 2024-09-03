function ensureAuthenticated(req, res, next) {
    if (res.locals.loggedUser) {
        next();
    } else {
        res.redirect('/login?error=needToBeLogged');
    }
};

export default ensureAuthenticated;