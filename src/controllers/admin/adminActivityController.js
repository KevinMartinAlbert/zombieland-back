import { Booking, User, Category, Activity } from '../../models/index.js';

const adminActivityController = {
  activitiesPage: (req, res) => {
    res.render('admin-activity', { currentPage: 'activities' });
  },
};

export default adminActivityController;
