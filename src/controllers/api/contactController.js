import nodemailer from 'nodemailer';

const contactController = {
  async sendContactForm(req, res) {
    const { firstname, lastname, email, message } = req.body;

    if (!firstname || !lastname || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.MAIL,
      subject: 'Nouveau message de contact',
      text: `Prénom: ${firstname}\nNom: ${lastname}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ message: 'Votre message a été envoyé avec succès.' });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
    }
  },
};

export default contactController;
