import React, { useState, useEffect } from 'react';
import { Table, Form, InputGroup, Badge } from 'react-bootstrap';
import Papa from 'papaparse';

const FoodRegulationTable = () => {
  const [regulations, setRegulations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    ingredient: '',
    category: '',
    status: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log('Starting data load...');
        
        // Load EU data
        console.log('Fetching EU data...');
        const euResponse = await fetch('/data/raw/eu/food-additives.json');
        if (!euResponse.ok) {
          throw new Error(`Failed to load EU data: ${euResponse.status} ${euResponse.statusText}`);
        }
        const euData = await euResponse.json();
        console.log('EU data loaded:', euData.length, 'items');
        
        // Load US data
        console.log('Fetching US data...');
        const usResponse = await fetch('/data/raw/us/IndirectAdditives.csv');
        if (!usResponse.ok) {
          throw new Error(`Failed to load US data: ${usResponse.status} ${usResponse.statusText}`);
        }
        const usText = await usResponse.text();
        
        // Skip the first 3 lines which are metadata
        const csvLines = usText.split('\n').slice(3).join('\n');
        
        const usParseResult = Papa.parse(csvLines, { 
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.trim().toLowerCase(),
          transform: value => value.trim()
        });
        
        if (usParseResult.errors.length > 0) {
          console.warn('CSV parsing errors:', usParseResult.errors);
        }
        
        const usData = usParseResult.data.filter(item => 
          item && item['substance'] && 
          // Filter out rows that don't have the required data
          typeof item['substance'] === 'string' &&
          item['substance'].length > 0
        );
        
        console.log('US data loaded:', usData.length, 'items');
        
        // Combine and normalize the data
        console.log('Normalizing data...');
        const combinedData = normalizeData(euData, usData);
        console.log('Combined data:', combinedData.length, 'items');
        
        // Apply filters
        const filteredData = combinedData.filter(item => {
          const matchesIngredient = !filter.ingredient || 
            item.ingredient.toLowerCase().includes(filter.ingredient.toLowerCase());
          const matchesCategory = !filter.category || 
            item.category.toLowerCase() === filter.category.toLowerCase();
          const matchesStatus = !filter.status || 
            (filter.status === 'banned-in-eu' && !item.status.eu.isAllowed) ||
            (filter.status === 'banned-in-us' && !item.status.us.isAllowed);
          
          return matchesIngredient && matchesCategory && matchesStatus;
        });
        
        console.log('Filtered data:', filteredData.length, 'items');
        setRegulations(filteredData);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(`Failed to load data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filter]);

  const normalizeData = (euData, usData) => {
    // Create a map of ingredients
    const ingredientMap = new Map();

    // Validate input data
    if (!Array.isArray(euData) || !Array.isArray(usData)) {
      console.error('Invalid data format:', { euData, usData });
      throw new Error('Invalid data format: Expected arrays for EU and US data');
    }

    // Process EU data
    euData.forEach(item => {
      if (!item || typeof item.name !== 'string') {
        console.warn('Invalid EU item:', item);
        return;
      }

      const normalizedName = item.name.toLowerCase().trim();
      ingredientMap.set(normalizedName, {
        ingredient: item.name,
        category: (item.category || 'other').toLowerCase().trim(),
        status: {
          eu: { isAllowed: item.status === 'allowed' },
          us: { isAllowed: true } // Default to true, will update with US data
        },
        healthConcerns: Array.isArray(item.healthConcerns) ? item.healthConcerns : []
      });
    });

    // Process US data
    usData.forEach(item => {
      if (!item || typeof item.substance !== 'string') {
        console.warn('Invalid US item:', item);
        return;
      }

      const normalizedName = item.substance.toLowerCase().trim();
      const regulatoryStatus = item.reg_prohibited189 ? 'banned' : 'allowed';
      
      if (ingredientMap.has(normalizedName)) {
        // Update existing ingredient with US status
        const existing = ingredientMap.get(normalizedName);
        existing.status.us.isAllowed = regulatoryStatus !== 'banned';
      } else {
        // Add new ingredient from US data
        ingredientMap.set(normalizedName, {
          ingredient: item.substance,
          category: 'other',
          status: {
            eu: { isAllowed: true }, // Default to true if not found in EU data
            us: { isAllowed: regulatoryStatus !== 'banned' }
          },
          healthConcerns: []
        });
      }
    });

    return Array.from(ingredientMap.values());
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const getStatusBadge = (isAllowed) => {
    return isAllowed ? (
      <Badge bg="success">Allowed</Badge>
    ) : (
      <Badge bg="danger">Banned</Badge>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-3">
      <h2 className="mb-4">Food Regulation Comparison</h2>
      
      {/* Filters */}
      <div className="mb-4">
        <Form className="row g-3">
          <div className="col-md-4">
            <InputGroup>
              <InputGroup.Text>Ingredient</InputGroup.Text>
              <Form.Control
                type="text"
                name="ingredient"
                value={filter.ingredient}
                onChange={handleFilterChange}
                placeholder="Search ingredients..."
              />
            </InputGroup>
          </div>
          
          <div className="col-md-4">
            <InputGroup>
              <InputGroup.Text>Category</InputGroup.Text>
              <Form.Select
                name="category"
                value={filter.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="preservative">Preservatives</option>
                <option value="colorant">Colorants</option>
                <option value="sweetener">Sweeteners</option>
                <option value="emulsifier">Emulsifiers</option>
                <option value="other">Other</option>
              </Form.Select>
            </InputGroup>
          </div>
          
          <div className="col-md-4">
            <InputGroup>
              <InputGroup.Text>Status</InputGroup.Text>
              <Form.Select
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="banned-in-eu">Banned in EU</option>
                <option value="banned-in-us">Banned in US</option>
              </Form.Select>
            </InputGroup>
          </div>
        </Form>
      </div>

      {/* Data Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Category</th>
            <th>US Status</th>
            <th>EU Status</th>
            <th>Health Concerns</th>
          </tr>
        </thead>
        <tbody>
          {regulations.map((regulation, index) => (
            <tr key={index}>
              <td>{regulation.ingredient}</td>
              <td>
                <Badge bg="info">
                  {regulation.category.charAt(0).toUpperCase() + regulation.category.slice(1)}
                </Badge>
              </td>
              <td>{getStatusBadge(regulation.status.us.isAllowed)}</td>
              <td>{getStatusBadge(regulation.status.eu.isAllowed)}</td>
              <td>
                {regulation.healthConcerns.map((concern, idx) => (
                  <Badge 
                    key={idx}
                    bg={
                      concern.severityLevel === 'high' ? 'danger' :
                      concern.severityLevel === 'medium' ? 'warning' : 'info'
                    }
                    className="me-1"
                  >
                    {concern.type}
                  </Badge>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FoodRegulationTable; 