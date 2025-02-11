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
        // Load WHO data files
        const [regulationsResponse, foodborneResponse] = await Promise.all([
          fetch('/data/raw/who/food-regulations.json'),
          fetch('/data/raw/who/foodborne-illness.json')
        ]);

        if (!regulationsResponse.ok || !foodborneResponse.ok) {
          throw new Error('Failed to load WHO data');
        }

        const [regulationsData, foodborneData] = await Promise.all([
          regulationsResponse.json(),
          foodborneResponse.json()
        ]);

        // Transform the data
        const transformedData = transformWHOData(regulationsData, foodborneData);
        console.log('Transformed WHO data:', transformedData);
        setData(transformedData);
      } catch (err) {
        console.error('Error processing WHO data:', err);
        setError(`Error processing WHO data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <div className="alert alert-info">Loading WHO food regulation data...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!data.data.length) return <div className="alert alert-warning">No WHO data available</div>;

  const colors = [
    'rgb(255, 99, 132)',   // Red
    'rgb(54, 162, 235)',   // Blue
    'rgb(255, 206, 86)',   // Yellow
    'rgb(75, 192, 192)',   // Teal
    'rgb(153, 102, 255)',  // Purple
    'rgb(255, 159, 64)',   // Orange
    'rgb(76, 175, 80)',    // Green
    'rgb(244, 67, 54)',    // Deep Red
    'rgb(33, 150, 243)',   // Light Blue
    'rgb(255, 235, 59)'    // Light Yellow
  ];

  const chartData = {
    labels: data.years,
    datasets: data.regions.map((region, index) => ({
      label: region,
      data: data.data.map(item => item[region]),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'WHO Food Regulations by Region (Over Time)',
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            return `${label}: ${value.toLocaleString()} regulations`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Regulations',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          callback: (value) => value.toLocaleString()
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={{ height: '500px', padding: '20px' }}>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default WHOVisualization; 