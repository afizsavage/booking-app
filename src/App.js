import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AddScooter from './components/add-scooter';
import Login from './components/auth/login';
import SignUp from './components/auth/sign-up';
import DeleteScooter from './components/delete-scooter';
import Header from './components/header';
import MyReservations from './components/my-reservations';
import Reserve from './components/reserve';
import Scooters from './components/scooters';
import SideBar from './components/sidebar';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [renderAside, setRenderAside] = useState(false);
  const { innerWidth } = window;

  useEffect(() => {
    if (innerWidth >= 1024 && currentRoute !== '/sign-up') {
      setRenderAside(true);
    } else {
      setRenderAside(false);
    }
  }, [currentRoute]);

  return (
    <div className="relative">
      <Header renderAside={renderAside} setRenderAside={setRenderAside} />
      <main className="flex h-screen">
        <SideBar renderAside={renderAside} setRenderAside={setRenderAside} />
        <Routes>
          <Route exact path="/" element={<Scooters />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
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
