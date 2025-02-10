const FoodRegulation = require('../models/FoodRegulation');

/**
 * Get all food regulations with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getAllRegulations = async (req, res) => {
  try {
    const { category, status, ingredient } = req.query;
    const query = {};

    if (category) query.category = category;
    if (ingredient) query.ingredient = new RegExp(ingredient, 'i');
    if (status === 'banned-in-eu') query['status.eu.isAllowed'] = false;
    if (status === 'banned-in-us') query['status.us.isAllowed'] = false;

    const regulations = await FoodRegulation.find(query);
    res.json(regulations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get regulation by ingredient name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getRegulationByIngredient = async (req, res) => {
  try {
    const regulation = await FoodRegulation.findOne({
      ingredient: new RegExp(req.params.ingredient, 'i')
    });
    
    if (!regulation) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    
    res.json(regulation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Compare US and EU regulations
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.compareRegulations = async (req, res) => {
  try {
    const regulations = await FoodRegulation.aggregate([
      {
        $group: {
          _id: {
            us_allowed: '$status.us.isAllowed',
            eu_allowed: '$status.eu.isAllowed'
          },
          ingredients: { $push: '$ingredient' },
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json(regulations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get health impact statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getHealthImpactStats = async (req, res) => {
  try {
    const stats = await FoodRegulation.aggregate([
      {
        $unwind: '$healthConcerns'
      },
      {
        $group: {
          _id: '$healthConcerns.severityLevel',
          ingredients: { $push: '$ingredient' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add new food regulation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.addRegulation = async (req, res) => {
  try {
    const regulation = new FoodRegulation(req.body);
    await regulation.save();
    res.status(201).json(regulation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update existing food regulation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateRegulation = async (req, res) => {
  try {
    const regulation = await FoodRegulation.findOneAndUpdate(
      { ingredient: req.params.ingredient },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!regulation) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
    
    res.json(regulation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 