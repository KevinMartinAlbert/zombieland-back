import Activity from './Activity.js';
import Booking from './Booking.js';
import Category from './Category.js';
import User from './User.js';

User.hasMany(Booking, {
  foreignKey: 'client_id',
  as: 'booking',
});
Booking.belongsTo(User, {
  foreignKey: 'client_id',
  as: 'client',
});

Activity.belongsToMany(Category, {
  through: 'activity_has_category',
  as: 'categories',
  foreignKey: 'activity_id',
  otherKey: 'category_id',
});
Category.belongsToMany(Activity, {
  through: 'activity_has_category',
  as: 'activities',
  foreignKey: 'category_id',
  otherKey: 'activity_id',
});

export { User, Booking, Activity, Category };
