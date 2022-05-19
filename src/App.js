import { Route, Routes } from 'react-router-dom';

import AddScooter from './components/add_scooter';
import DeleteScooter from './components/delete_scooter';
import MyReservations from './components/my_reservations';
import Reserve from './components/reserve';
import Scooters from './components/scooters';
import SideBar from './components/sidebar';

function App() {
  return (
    <main className="relative flex">
      <SideBar />
      <Routes>
        <Route exact path="/" element={<Scooters />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservations" element={<MyReservations />} />
        <Route path="/add" element={<AddScooter />} />
        <Route path="/delete" element={<DeleteScooter />} />
      </Routes>
    </main>
  );
}

export default App;
