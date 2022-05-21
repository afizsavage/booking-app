import { useState, useEffect } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AddScooter from './components/add_scooter';
import DeleteScooter from './components/delete_scooter';
import Header from './components/header';
import MyReservations from './components/my_reservations';
import Reserve from './components/reserve';
import Scooters from './components/scooters';
import SideBar from './components/sidebar';
import HomePage from './pages/HomePage';
import BikeDetails from './pages/BikeDetails';
import ManageBikes from './pages/ManageBikes';

function App() {
  const [renderAside, setRenderAside] = useState(false);
  const { innerWidth } = window;

  useEffect(() => {
    if (innerWidth >= 1024) {
      setRenderAside(true);
    }
  }, [innerWidth]);

  return (
    <div className="relative">
      <Header renderAside={renderAside} setRenderAside={setRenderAside} />
      <main className="flex">
        <SideBar renderAside={renderAside} setRenderAside={setRenderAside} />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="/bikes/:bikeId" element={<BikeDetails />} />
          <Route exact path="/" element={<Scooters />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/add" element={<AddScooter />} />
          <Route path="/delete" element={<DeleteScooter />} />
          <Route
            path="/admin/manage-bikes"
            element={(
              <ProtectedRoute>
                <ManageBikes />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
