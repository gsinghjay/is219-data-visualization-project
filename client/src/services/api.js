import axios from 'axios';
import {
  processUSData,
  processEUData,
  combineRegulationData,
  processObesityData,
  processFoodborneIllnessData
} from '../utils/dataProcessing';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * API service for fetching and processing food regulation data
 */
const api = {
  /**
   * Fetches and processes regulatory data for both US and EU
   * @returns {Promise<Array>} Combined and processed regulation data
   */
  async getRegulatoryData() {
    try {
      const [usResponse, euResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/us-additives`),
        axios.get(`${API_BASE_URL}/eu-additives`)
      ]);

      const processedUSData = processUSData(usResponse.data);
      const processedEUData = processEUData(euResponse.data);

      return combineRegulationData(processedUSData, processedEUData);
    } catch (error) {
      console.error('Error fetching regulatory data:', error);
      throw error;
    }
  },

  /**
   * Fetches and processes WHO obesity data
   * @returns {Promise<Array>} Processed obesity trend data
   */
  async getObesityData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/obesity-data`);
      return processObesityData(response.data);
    } catch (error) {
      console.error('Error fetching obesity data:', error);
      throw error;
    }
  },

  /**
   * Fetches and processes foodborne illness data
   * @returns {Promise<Array>} Processed foodborne illness data
   */
  async getFoodborneIllnessData() {
    try {
      const response = await axios.get(`${API_BASE_URL}/foodborne-illness`);
      return processFoodborneIllnessData(response.data);
    } catch (error) {
      console.error('Error fetching foodborne illness data:', error);
      throw error;
    }
  }
};

export default api; 