import { useEffect, useState } from 'react';
import axios from 'axios';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem('token');

  // let reservations;

  useEffect(() => {
    axios
      .get('https://sheltered-tor-84017.herokuapp.com/api/v2/my_reservations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // reservations = res.data;
        setReservations(res.data);
      });
  }, []);

  const cancelReservation = (e) => {
    e.preventDefault();
    const [id] = e.target.id.split('-');
    axios
      .delete(`https://sheltered-tor-84017.herokuapp.com/api/v2/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          motorcycle_id: id,
        },
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="w-full h-full pt-5 lg:pt-10">
      <div className="mb-5 lg:mb-14">
        <h1 className="font-bold text-xl text-center md:text-3xl md:mb-2 uppercase text-gray-700">
          Reservations
        </h1>
      </div>
      <div>
        <ul className="flex w-full flex-wrap justify-center">
          {reservations?.map((reservation) => (
            <li
              className="border w-52 h-52 mx-4 my-4"
              key={reservations.indexOf(reservation)}
            >
              <div className="w-full h-full p-3">
                <h3 className="text-center text-lg mt-4 text-gray-600 mb-3 font-semibold">
                  {reservation.motorcycle.title}
                </h3>
                <div className="font-medium mb-5">
                  <span className="block font-medium">{`City: ${reservation.city}`}</span>
                  <span className="block ont-medium">{`Date: ${reservation.date}`}</span>
                </div>
                <button className="w-full py-1 bg-amber-500" type="button" id={reservation.id} onClick={cancelReservation}>
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyReservations;
