import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AddScooter from './components/add-scooter';
import SignUp from './components/auth/sign-up';
import DeleteScooter from './components/delete-scooter';
import Header from './components/header';
import MyReservations from './components/my-reservations';
import Reserve from './components/reserve';
import Scooters from './components/scooters';
import SideBar from './components/sidebar';

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
          <Route exact path="/" element={<Scooters />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/add" element={<AddScooter />} />
          <Route path="/delete" element={<DeleteScooter />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
