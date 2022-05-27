import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AddMotorcycle from './components/add-motorcycle';
import Login from './components/auth/login';
import SignUp from './components/auth/sign-up';
import DeleteMotorcycle from './components/delete-motorcycle';
import Header from './components/header';
import MyReservations from './pages/MyReservations';
import Reserve from './components/reserve';
import SideBar from './components/sidebar';
import HomePage from './pages/HomePage';
import BikeDetails from './pages/BikeDetails';
import ManageBikes from './pages/ManageBikes';
import Motorcycles from './components/motocycles';
import { logUserIn } from './redux/users/userSlice';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [renderAside, setRenderAside] = useState(false);
  const { innerWidth } = window;
  const dispatch = useDispatch();

  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user;
  };

  useEffect(() => {
    if (
      innerWidth >= 1024
        && currentRoute !== '/sign-up'
        && currentRoute !== '/login'
    ) {
      setRenderAside(true);
    } else {
      setRenderAside(false);
    }

    if (getCurrentUser()) {
      const user = JSON.parse(getCurrentUser());
      dispatch(logUserIn(user));
    }
  }, [currentRoute]);

  return (
    <div className="relative">
      <Header renderAside={renderAside} setRenderAside={setRenderAside} />
      <main className="flex h-screen">
        <SideBar renderAside={renderAside} setRenderAside={setRenderAside} />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="/bikes/:bikeId" element={<BikeDetails />} />
          <Route path="/reserve/:id" element={<Reserve />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/manage-page" element={<ManageBikes />} />
          <Route exact path="/" element={<Motorcycles />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/add" element={<AddMotorcycle />} />
          <Route path="/delete" element={<DeleteMotorcycle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
