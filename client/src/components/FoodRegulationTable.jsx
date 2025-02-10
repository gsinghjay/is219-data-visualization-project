import React, { useState } from 'react';
import { Table, Form, InputGroup, Badge } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const FoodRegulationTable = () => {
  const [filter, setFilter] = useState({
    ingredient: '',
    category: '',
    status: ''
  });

  const { data: regulations, isLoading, error } = useQuery({
    queryKey: ['regulations', filter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter.ingredient) params.append('ingredient', filter.ingredient);
      if (filter.category) params.append('category', filter.category);
      if (filter.status) params.append('status', filter.status);
      
      const response = await axios.get(`/api/regulations?${params.toString()}`);
      return response.data;
    }
  });

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
  if (error) return <div>Error: {error.message}</div>;

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
          {regulations?.map((regulation) => (
            <tr key={regulation._id}>
              <td>{regulation.ingredient}</td>
              <td>
                <Badge bg="info">
                  {regulation.category.charAt(0).toUpperCase() + regulation.category.slice(1)}
                </Badge>
              </td>
              <td>{getStatusBadge(regulation.status.us.isAllowed)}</td>
              <td>{getStatusBadge(regulation.status.eu.isAllowed)}</td>
              <td>
                {regulation.healthConcerns.map((concern, index) => (
                  <Badge 
                    key={index}
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