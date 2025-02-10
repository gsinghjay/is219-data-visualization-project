const mongoose = require('mongoose');

const foodRegulationSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    us: {
      isAllowed: { type: Boolean, required: true },
      regulatoryBody: { type: String, default: 'FDA' },
      notes: String,
      lastUpdated: { type: Date, default: Date.now }
    },
    eu: {
      isAllowed: { type: Boolean, required: true },
      regulatoryBody: { type: String, default: 'EFSA' },
      notes: String,
      lastUpdated: { type: Date, default: Date.now }
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['preservative', 'colorant', 'sweetener', 'emulsifier', 'other']
  },
  healthConcerns: [{
    type: String,
    description: String,
    severityLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    scientificEvidence: [{
      studyLink: String,
      year: Number,
      findings: String
    }]
  }],
  commonProducts: [{
    type: String,
    trim: true
  }],
  alternativeIngredients: [{
    name: String,
    description: String,
    safetyProfile: String
  }],
  metadata: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    source: String,
    lastVerified: Date
  }
}, {
  timestamps: true,
  collection: 'food_regulations'
});

// Index for faster queries
foodRegulationSchema.index({ ingredient: 1, category: 1 });
foodRegulationSchema.index({ 'status.us.isAllowed': 1, 'status.eu.isAllowed': 1 });

// Pre-save middleware to update metadata
foodRegulationSchema.pre('save', function(next) {
  this.metadata.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('FoodRegulation', foodRegulationSchema); 