/**
 * Transforms EU food additives data for visualization
 * @param {Array} data - Raw EU food additives data
 * @returns {Object} Transformed data ready for visualization
 */
export const transformEUData = (data) => {
  try {
    // Group additives by category
    const categoryCount = data.reduce((acc, item) => {
      const category = item.category || 'Unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Transform for visualization
    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
    }));
  } catch (error) {
    console.error('Error transforming EU data:', error);
    return [];
  }
};

/**
 * Transforms US food additives data for visualization
 * @param {Array} data - Raw US food additives CSV data
 * @returns {Object} Transformed data ready for visualization
 */
export const transformUSData = (data) => {
  try {
    // Skip metadata rows and process
    const processedData = data.reduce((acc, item) => {
      const status = item['Reg prohibited189'] ? 'Prohibited' : 'Allowed';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Transform for visualization
    return Object.entries(processedData).map(([status, count]) => ({
      status,
      count,
    }));
  } catch (error) {
    console.error('Error transforming US data:', error);
    return [];
  }
};

/**
 * Transforms WHO food safety and regulation data for visualization
 * @param {Object} regulations - WHO food regulations data
 * @param {Object} foodborne - WHO foodborne illness data
 * @param {Object} safety - WHO food safety data
 * @returns {Object} Transformed data ready for visualization
 */
export const transformWHOData = (regulations, foodborne, safety) => {
  try {
    // Process regulations data
    const regData = regulations.fact?.reduce((acc, item) => {
      const year = item.year || 'Unknown';
      const region = item.region || 'Unknown';
      
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][region]) {
        acc[year][region] = 0;
      }
      acc[year][region]++;
      
      return acc;
    }, {}) || {};

    // Transform for visualization
    const years = Object.keys(regData).sort();
    const regions = [...new Set(Object.values(regData).flatMap(year => Object.keys(year)))];

    return {
      years,
      regions,
      data: years.map(year => ({
        year,
        ...regions.reduce((acc, region) => ({
          ...acc,
          [region]: regData[year][region] || 0
        }), {})
      }))
    };
  } catch (error) {
    console.error('Error transforming WHO data:', error);
    return { years: [], regions: [], data: [] };
  }
}; 