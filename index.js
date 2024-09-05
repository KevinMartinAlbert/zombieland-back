import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/router/index.js';
import putAdminDataInReq from './src/middlewares/putAdminDataInReq.js';
import notFoundMiddleware from './src/middlewares/notFound.js';

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
app.use(express.json());

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

// Middleware pour gérer les messages d'erreur et de succès
app.use((req, res, next) => {
  if (req.session.errorMessage) {
    res.locals.errorMessage = req.session.errorMessage;
    req.session.errorMessage = null; // Efface le message d'erreur de la session après l'avoir transféré dans res.locals
  } else {
    res.locals.errorMessage = null;
  }

  if (req.session.successMessage) {
    res.locals.successMessage = req.session.successMessage;
    req.session.successMessage = null; // Efface le message de succès de la session après l'avoir transféré dans res.locals
  } else {
    res.locals.successMessage = null;
  }

  next();
});

app.use(putAdminDataInReq);

app.use(errorHandler);

app.use(router);

app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
