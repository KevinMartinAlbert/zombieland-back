//import { z } from 'zod';
import { Activity, Category } from '../../models/index.js';

const activityController = {
  async getAll(req, res) {
    try {
      const activities = await Activity.findAll({
        order: [['name', 'ASC']],
        include: [
          {
            model: Category,
            as: 'categories',
            attributes: ['category_id', 'name'],
            through: { attributes: [] },
          },
        ],
      });

      res.json(activities);
    } catch (error) {
      console.error('Erreur lors de la récupération des activités:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des activités',
      });
    }
  },

  async getOneActivity(req, res) {
    try {
      const activityId = req.params.id;
      const activity = await Activity.findByPk(activityId);
      res.json(activity);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching one activity' });
    }
  },
};

export default activityController;
