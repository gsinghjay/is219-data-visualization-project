import React from 'react';
import EUVisualization from './EUVisualization';
import USVisualization from './USVisualization';
import WHOVisualization from './WHOVisualization';

const VisualizationDashboard = () => {
  return (
    <div className="container-fluid p-4">
      <h1 className="text-center mb-4">Food Regulation Data Visualization Dashboard</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title h4 mb-3">Key Research Question</h2>
          <p className="lead text-center mb-3" style={{ fontStyle: 'italic' }}>
            "How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?"
          </p>
          
          <div className="mt-4">
            <h3 className="h5 mb-3">Key Findings:</h3>
            <div className="row">
              <div className="col-md-6">
                <h4 className="h6">Regulatory Differences:</h4>
                <ul className="list-unstyled">
                  <li>🔍 <strong>EU Approach:</strong> Precautionary principle - additives must be proven safe before approval</li>
                  <li>🔍 <strong>US Approach:</strong> Additives allowed unless proven harmful</li>
                  <li>🚫 <strong>Banned Substances:</strong> Several additives permitted in US are banned in EU</li>
                  <li>🌾 <strong>GMO Regulations:</strong> EU has stricter labeling requirements</li>
                  <li>💊 <strong>Antibiotic Use:</strong> More restricted in EU agriculture</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h4 className="h6">Health Implications:</h4>
                <ul className="list-unstyled">
                  <li>🥗 EU consumers potentially exposed to fewer harmful additives</li>
                  <li>🔬 US approach may enable faster food technology innovation</li>
                  <li>🌿 EU has stricter organic farming standards</li>
                  <li>🦠 Different approaches to antibiotic resistance risk</li>
                  <li>📊 Varying health outcomes based on regulatory philosophy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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