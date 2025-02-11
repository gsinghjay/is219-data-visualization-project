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
 * @returns {Object} Transformed data ready for visualization
 */
export const transformWHOData = (regulations, foodborne) => {
  try {
    console.log('Raw regulations data:', regulations);
    console.log('Raw foodborne data:', foodborne);

    // Validate input data
    if (!regulations?.dimension || !Array.isArray(regulations.dimension)) {
      console.error('Invalid regulations data structure:', regulations);
      throw new Error('Invalid regulations data format');
    }

    // Get the relevant dimensions
    const yearDim = regulations.dimension.find(d => d.label === 'YEAR');
    const regionDim = regulations.dimension.find(d => d.label === 'REGION');

    console.log('Found dimensions:', {
      yearDim,
      regionDim
    });

    if (!yearDim?.code || !regionDim?.code) {
      console.error('Missing required dimensions:', { yearDim, regionDim });
      throw new Error('Missing required dimensions in WHO data');
    }

    // Extract years and regions
    const years = yearDim.code
      .map(y => y.display || y.label)
      .filter(y => y && !isNaN(y))
      .sort((a, b) => parseInt(a) - parseInt(b));

    const regions = regionDim.code
      .map(r => r.display || r.label)
      .filter(r => r && r !== 'Unknown');

    console.log('Extracted years and regions:', { years, regions });

    // Process the fact data
    const regData = {};
    years.forEach(year => {
      regData[year] = {};
      regions.forEach(region => {
        regData[year][region] = 0;
      });
    });

    // Helper function to find dimension value in a fact
    const getFactDimensionValue = (fact, dimLabel) => {
      const dim = fact.dimension?.find(d => d.label === dimLabel);
      if (!dim) return null;
      return dim.code?.[0]?.display || dim.code?.[0]?.label || null;
    };

    // Aggregate the data
    if (regulations.fact && Array.isArray(regulations.fact)) {
      console.log('Processing facts:', regulations.fact.length);
      regulations.fact.forEach((fact, index) => {
        if (index < 5) console.log('Processing fact:', fact); // Log first 5 facts for debugging

        // Find the year and region codes in the fact's dimensions
        const yearCode = fact.dimension?.find(d => d.label === 'YEAR')?.code?.[0]?.label;
        const regionCode = fact.dimension?.find(d => d.label === 'REGION')?.code?.[0]?.label;

        // Look up the display values from the main dimensions
        const year = yearDim.code.find(y => y.label === yearCode)?.display;
        const region = regionDim.code.find(r => r.label === regionCode)?.display;
        
        if (year && region && !isNaN(fact.value)) {
          if (!regData[year]) regData[year] = {};
          if (!regData[year][region]) regData[year][region] = 0;
          regData[year][region] += parseFloat(fact.value);
          if (index < 5) console.log('Added value:', { year, region, value: fact.value });
        } else {
          if (index < 5) console.log('Skipped fact due to missing data:', { yearCode, regionCode, year, region, value: fact.value });
        }
      });
    } else {
      console.log('No facts found in regulations data');
    }

    console.log('Aggregated data:', regData);

    // Create the final dataset
    const data = years.map(year => {
      const yearData = {
        year: parseInt(year),
        ...regions.reduce((acc, region) => ({
          ...acc,
          [region]: Math.round(regData[year]?.[region] || 0)
        }), {})
      };

      // Add foodborne illness data if available
      if (foodborne?.fact && Array.isArray(foodborne.fact)) {
        const illnessData = foodborne.fact.find(item => {
          const yearCode = item.dimension?.find(d => d.label === 'YEAR')?.code?.[0]?.label;
          const year = yearDim.code.find(y => y.label === yearCode)?.display;
          return year && !isNaN(item.value);
        });
        
        if (illnessData) {
          yearData.illness_cases = Math.round(parseFloat(illnessData.value));
        }
      }

      return yearData;
    });

    console.log('Final transformed data:', { years, regions, data });

    return {
      years,
      regions,
      data
    };
  } catch (error) {
    console.error('Error transforming WHO data:', error);
    return {
      years: [],
      regions: [],
      data: []
    };
  }
}; 