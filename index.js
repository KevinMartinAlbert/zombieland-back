import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/router/index.js';
import putAdminDataInReq from './src/middlewares/putAdminDataInReq.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Configure assets routes (static folder)
app.use(express.static('src/public'));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      'default value si pas de session secret dans le fichier .env',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 2 heures
      maxAge: 1000 * 60 * 60 * 2,
    },
  }),
);

// Sur toutes mes requêtes, je vais récupérer les informations de l'utilisateur
// Pour les mettre dans req.loggedUser et req.locals.loggedUser
app.use(putAdminDataInReq);

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
