import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { transformUSData } from '../../utils/transformers/dataTransformers';
import Papa from 'papaparse';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const USVisualization = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/raw/us/IndirectAdditives.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        // Skip the first 3 lines which contain metadata
        const csvLines = csvText.split('\n').slice(3).join('\n');
        
        Papa.parse(csvLines, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.warn('CSV parsing errors:', results.errors);
            }
            const transformedData = transformUSData(results.data);
            setData(transformedData);
            setIsLoading(false);
          },
          error: (error) => {
            console.error('CSV parsing error:', error);
            setError('Failed to parse CSV data');
            setIsLoading(false);
          }
        });
      } catch (err) {
        console.error('Error loading US data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <div>Loading US food additives data...</div>;
  if (error) return <div>Error loading US data: {error}</div>;
  if (!data.length) return <div>No data available</div>;

  const chartData = {
    labels: data.map(item => item.status),
    datasets: [
      {
        label: 'Number of Additives',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'US Food Additives by Regulatory Status',
        font: {
          size: 16
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Additives'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Regulatory Status'
        }
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default USVisualization; 