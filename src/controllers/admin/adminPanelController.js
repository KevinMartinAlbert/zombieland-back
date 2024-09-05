/* eslint-disable */

const adminPanelController = {
  // PAGES CONTROLLER

  homePage: (req, res) => {
    res.render('index', { currentPage: 'home' });
  },
};

export default adminPanelController;
