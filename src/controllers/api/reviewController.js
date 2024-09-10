import { Review, User, Activity } from '../../models/index.js';

const reviewController = {
  async getAll(req, res) {
    try {
      const reviews = await Review.findAll({
        order: [['created_at', 'DESC']],
      });
      res.json(reviews);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des avis',
      });
    }
  },

  async getOneReview(req, res) {
    try {
      const reviewId = req.params.id;
      const review = await Review.findByPk(reviewId, {
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['user_id', 'first_name', 'last_name'],
            through: { attributes: [] },
          },
          {
            model: Activity,
            as: 'activities',
            attributes: ['activity_id', 'name'],
            through: { attributes: [] },
          },
        ],
      });

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      res.json(review);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while fetching the review',
      });
    }
  },

  async createReview(req, res) {
    try {
      const { content, rating, client_id, activity_id } = req.body;
      if (!content || !rating || !client_id || !activity_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newReview = await Review.create({
        content,
        rating,
        client_id,
        activity_id,
      });
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Erreur lors de la création de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while creating the review',
      });
    }
  },

  async updateReview(req, res) {
    try {
      const reviewId = req.params.id;
      const newReviewData = req.body;

      const review = await Review.findByPk(reviewId);

      if (!review) {
        return res.status(404).json({ error: 'review not found' });
      }

      if (newReviewData) {
        review = newReviewData;
      }

      await review.save();
      res.json(review);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while updating the review',
      });
    }
  },

  async deleteReview(req, res) {
    try {
      const reviewId = req.params.id;
      const review = await Review.findByPk(reviewId);

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      await review.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis:", error);
      res.status(500).json({
        error: 'An error occurred while deleting the review',
      });
    }
  },
};

export default reviewController;
