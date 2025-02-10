const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const foodRegulationController = require('../controllers/foodRegulationController');

// Validation middleware
const validateRegulation = [
  body('ingredient').trim().notEmpty().withMessage('Ingredient name is required'),
  body('status.us.isAllowed').isBoolean(),
  body('status.eu.isAllowed').isBoolean(),
  body('category').isIn(['preservative', 'colorant', 'sweetener', 'emulsifier', 'other'])
];

// Routes
router.get('/regulations', foodRegulationController.getAllRegulations);
router.get('/regulations/compare', foodRegulationController.compareRegulations);
router.get('/regulations/health-impact', foodRegulationController.getHealthImpactStats);
router.get('/regulations/:ingredient', foodRegulationController.getRegulationByIngredient);
router.post('/regulations', validateRegulation, foodRegulationController.addRegulation);
router.put('/regulations/:ingredient', validateRegulation, foodRegulationController.updateRegulation);

module.exports = router; 