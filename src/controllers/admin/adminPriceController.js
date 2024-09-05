import { Booking, User, Category, Activity } from '../../models/index.js';

const adminPriceController = {
  pricesPage: (req, res) => {
    res.render('admin-price', { currentPage: 'prices' });
  },
};

export default adminPriceController;
