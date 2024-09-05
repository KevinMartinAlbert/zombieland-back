import { Category, Activity } from '../../models/index.js';

const categoryController = {
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']],
      });
      res.json(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des catégories',
      });
    }
  },

  async getOneCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId, {
        include: [
          {
            model: Activity,
            as: 'activities',
            attributes: ['activity_id', 'name', 'description_short'],
            through: { attributes: [] },
          },
        ],
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error);
      res.status(500).json({
        error: 'An error occurred while fetching the category',
      });
    }
  },

  async createCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      res.status(500).json({
        error: 'An error occurred while creating the category',
      });
    }
  },

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const { name } = req.body;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      if (name) {
        category.name = name;
      }

      await category.save();
      res.json(category);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      res.status(500).json({
        error: 'An error occurred while updating the category',
      });
    }
  },

  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      await category.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      res.status(500).json({
        error: 'An error occurred while deleting the category',
      });
    }
  },
};

export default categoryController;
