import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { transformWHOData } from '../../utils/transformers/dataTransformers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WHOVisualization = () => {
  const [data, setData] = useState({ years: [], regions: [], data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all WHO data files
        const [regulationsRes, foodborneRes, safetyRes] = await Promise.all([
          fetch('/data/raw/who/food-regulations.json'),
          fetch('/data/raw/who/foodborne-illness.json'),
          fetch('/data/raw/who/food-safety.json')
        ]);

        if (!regulationsRes.ok || !foodborneRes.ok || !safetyRes.ok) {
          throw new Error('Failed to load one or more WHO data files');
        }

        const [regulations, foodborne, safety] = await Promise.all([
          regulationsRes.json(),
          foodborneRes.json(),
          safetyRes.json()
        ]);

        const transformedData = transformWHOData(regulations, foodborne, safety);
        setData(transformedData);
      } catch (err) {
        console.error('Error loading WHO data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <div>Loading WHO food regulation data...</div>;
  if (error) return <div>Error loading WHO data: {error}</div>;
  if (!data.data.length) return <div>No data available</div>;

  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
  ];

  const chartData = {
    labels: data.years,
    datasets: data.regions.map((region, index) => ({
      label: region,
      data: data.data.map(item => item[region]),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.4
    }))
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
        text: 'WHO Food Regulations Over Time by Region',
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
          text: 'Number of Regulations'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WHOVisualization; 