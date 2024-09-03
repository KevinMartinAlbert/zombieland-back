import { User } from '../models/index.js';

async function putUserDataInReq(req, res, next) {
  // Je vais récupérer depuis ma base de données l'utilisateur qui a l'email donné
  // Si j'ai un utilisateur en session, je le récupère
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId);
    req.loggedUser = user;
    res.locals.loggedUser = user;
  }
  next();
}

export default putUserDataInReq;