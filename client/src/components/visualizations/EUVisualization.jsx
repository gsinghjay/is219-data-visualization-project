import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale
} from 'chart.js';
import { transformEUData } from '../../utils/transformers/dataTransformers';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const EUVisualization = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/raw/eu/food-additives.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        const transformedData = transformEUData(rawData);
        setData(transformedData);
      } catch (err) {
        console.error('Error loading EU data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <div>Loading EU food additives data...</div>;
  if (error) return <div>Error loading EU data: {error}</div>;
  if (!data.length) return <div>No data available</div>;

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'EU Food Additives by Category',
        font: {
          size: 16
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default EUVisualization; 