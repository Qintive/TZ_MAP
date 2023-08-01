import React from 'react';
import MapView from './components/MapView';
import RouteTable from './components/RouteTable';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <RouteTable />
      <MapView />
    </div>
  );
}

export default App;
