import React from 'react';
import EUVisualization from './EUVisualization';
import USVisualization from './USVisualization';
import WHOVisualization from './WHOVisualization';

const VisualizationDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <h1 className="text-center mb-4">Food Regulation Data Visualization Dashboard</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <EUVisualization />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <USVisualization />
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <WHOVisualization />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationDashboard; 