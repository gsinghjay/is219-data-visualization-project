import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import FoodRegulationTable from './components/FoodRegulationTable';
import VisualizationDashboard from './components/visualizations/VisualizationDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="/">Food Regulation Analysis</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/comparison">Comparison Table</Nav.Link>
                <Nav.Link href="/visualizations">Visualizations</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/methodology">Methodology</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid>
          <Routes>
            <Route path="/" element={<VisualizationDashboard />} />
            <Route path="/comparison" element={<FoodRegulationTable />} />
            <Route path="/visualizations" element={<VisualizationDashboard />} />
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="/methodology" element={<h1>Methodology Page</h1>} />
          </Routes>
        </Container>

        <footer className="footer mt-5 py-3 bg-light">
          <Container className="text-center">
            <span className="text-muted">
              © 2024 Food Regulation Analysis Project
            </span>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;
