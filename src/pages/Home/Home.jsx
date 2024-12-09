import React, { useState } from 'react';
import PropertyGrid from '../../components/PropertyGrid/PropertyGrid';
import PropertyFilters from '../../components/PropertyFilters/PropertyFilters';
import "./Home.scss";

const Home = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="home-page">
      <div className="home-filters">
        <PropertyFilters filters={filters} setFilters={setFilters} />
      </div>
      <div className="home-content">
        <PropertyGrid filters={filters} />
      </div>
    </div>
  );
};

export default Home;