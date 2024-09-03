function ensureIsAdmin(req, res, next) {
    // Si l'utilisateur n'est pas connecté
    if (req.loggedUser?.role !== 'admin') {
        // Je le redirige vers la page de login
        res.redirect('/');
    } else {
        next();
    }
}

export default ensureIsAdmin;