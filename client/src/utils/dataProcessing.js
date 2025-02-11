/**
 * Data processing utilities for food regulation analysis
 */

import Papa from 'papaparse';

/**
 * Gets and processes US additive data from local CSV files
 * @returns {Promise<Object>} Processed data with categorized additives
 */
export const getUSData = async () => {
  const categories = {
    preservatives: 0,
    colorants: 0,
    sweeteners: 0,
    emulsifiers: 0,
    flavorEnhancers: 0,
    others: 0
  };

  // Keywords to identify categories
  const categoryKeywords = {
    preservatives: ['preservative', 'antimicrobial', 'antioxidant'],
    colorants: ['color', 'dye', 'pigment'],
    sweeteners: ['sweetener', 'sugar', 'syrup'],
    emulsifiers: ['emulsifier', 'stabilizer', 'thickener'],
    flavorEnhancers: ['flavor', 'enhancer', 'taste']
  };

  try {
    // Load and parse indirect additives CSV
    const indirectAdditivesResponse = await fetch('/data/raw/us/IndirectAdditives.csv');
    const indirectAdditivesText = await indirectAdditivesResponse.text();
    const { data: indirectAdditives } = Papa.parse(indirectAdditivesText, { 
      header: true,
      skipEmptyLines: true
    });

    // Process indirect additives
    indirectAdditives.forEach(additive => {
      let categorized = false;
      const description = (additive.description || '').toLowerCase();

      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => description.includes(keyword))) {
          categories[category]++;
          categorized = true;
          break;
        }
      }

      if (!categorized) {
        categories.others++;
      }
    });

    // Load and parse direct additives CSV if it exists and has content
    try {
      const directAdditivesResponse = await fetch('/data/raw/us/direct-additives.csv');
      const directAdditivesText = await directAdditivesResponse.text();
      if (directAdditivesText.trim()) {
        const { data: directAdditives } = Papa.parse(directAdditivesText, { 
          header: true,
          skipEmptyLines: true
        });

        directAdditives.forEach(additive => {
          let categorized = false;
          const description = (additive.description || '').toLowerCase();

          for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => description.includes(keyword))) {
              categories[category]++;
              categorized = true;
              break;
            }
          }

          if (!categorized) {
            categories.others++;
          }
        });
      }
    } catch (error) {
      console.warn('Direct additives file not found or empty:', error);
    }

    return categories;
  } catch (error) {
    console.error('Error processing US data:', error);
    throw error;
  }
};

/**
 * Gets and processes EU additive data from local JSON file
 * @returns {Promise<Object>} Processed data with categorized additives
 */
export const getEUData = async () => {
  const categories = {
    preservatives: 0,
    colorants: 0,
    sweeteners: 0,
    emulsifiers: 0,
    flavorEnhancers: 0,
    others: 0
  };

  try {
    // Load EU additives JSON
    const euAdditivesResponse = await fetch('/data/raw/eu/food-additives.json');
    const euAdditives = await euAdditivesResponse.json();

    // E-number ranges for categories
    const categoryRanges = {
      colorants: { start: 100, end: 199 },
      preservatives: { start: 200, end: 299 },
      emulsifiers: { start: 400, end: 499 },
      sweeteners: { start: 950, end: 969 }
    };

    euAdditives.forEach(additive => {
      const eNumber = parseInt(additive.eNumber?.replace('E', ''));
      let categorized = false;

      // Categorize based on E-number ranges
      for (const [category, range] of Object.entries(categoryRanges)) {
        if (eNumber >= range.start && eNumber <= range.end) {
          categories[category]++;
          categorized = true;
          break;
        }
      }

      // Check description for flavor enhancers
      if (!categorized && additive.description?.toLowerCase().includes('flavour')) {
        categories.flavorEnhancers++;
        categorized = true;
      }

      if (!categorized) {
        categories.others++;
      }
    });

    return categories;
  } catch (error) {
    console.error('Error processing EU data:', error);
    throw error;
  }
};

/**
 * Gets combined regulation data for visualization
 * @returns {Promise<Array>} Combined data for visualization
 */
export const getCombinedRegulationData = async () => {
  try {
    const [usData, euData] = await Promise.all([
      getUSData(),
      getEUData()
    ]);

    return Object.keys(usData).map(category => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      US: usData[category],
      EU: euData[category]
    }));
  } catch (error) {
    console.error('Error combining regulation data:', error);
    throw error;
  }
};

/**
 * Gets WHO obesity data
 * @returns {Promise<Array>} Processed obesity trend data
 */
export const getObesityData = async () => {
  try {
    const response = await fetch('/data/raw/who/obesity/adult-obesity.json');
    const obesityData = await response.json();

    return Object.entries(obesityData)
      .map(([year, data]) => ({
        year: parseInt(year),
        US: data.US || 0,
        EU: data.EU || 0
      }))
      .sort((a, b) => a.year - b.year);
  } catch (error) {
    console.error('Error processing obesity data:', error);
    throw error;
  }
};

/**
 * Gets foodborne illness data
 * @returns {Promise<Array>} Processed foodborne illness data
 */
export const getFoodborneIllnessData = async () => {
  try {
    const response = await fetch('/data/raw/who/foodborne-illness.json');
    const illnessData = await response.json();

    return Object.entries(illnessData).map(([region, data]) => ({
      region,
      illnessRate: data.rate || 0,
      year: data.year || 0
    }));
  } catch (error) {
    console.error('Error processing foodborne illness data:', error);
    throw error;
  }
}; 