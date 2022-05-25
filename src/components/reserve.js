/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState /* useEffect */ } from 'react';
import { useSelector } from 'react-redux';
import
/* extendedReservationsSlice, */{
  selectAvailableScooterIds,
  // selectAllReservation,
  useGetAvailableScotersQuery,
  // useGetReservationQuery,
} from '../redux/reservations/reservationsSlice';
import '../stylesheets/reservation.css';
// import store from '../redux/configureStore';

const Reserve = () => {
  const { isLoading, isSuccess, isError } = useGetAvailableScotersQuery();
  // const {
  //   isLoading: isLoadingReservation,
  //   isSuccess: isSuccessReservation,
  //   isError: isErrorReservation,
  // } = useGetReservationQuery();

  const orderedScootersIds = useSelector(selectAvailableScooterIds);
  // const reservation = useSelector(selectAllReservation);
  // const scootersStatus = useSelector(getAvailableScootersStatus);

  const getId = (e) => {
    e.preventDefault();
    // console.log(e.target.id);
    // store.dispatch(
    //   extendedReservationsSlice.endpoints.getReservation.initiate({
    //     id: e.target.id,
    //   }),
    // );
  };

  const [city, setCity] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const getCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Error!</p>;
  }
  if (isSuccess) {
    content = orderedScootersIds.map((id) => (
      <p onClick={getId} key={id} id={id}>
        {id}
      </p>
    ));
  }

  return (
    <div className="reserve-wrapper">
      {city ? (
        <p>Select a scooter</p>
      )
        : (
          <>
            <h1>Reserve an electric scooter for the fun of your life</h1>
            <hr />
            <span className="reserver-wrapper-description">
              lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
              dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
              lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
              dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
            </span>
          </>
        )}
      <div className="reserve-container">
        <div className="reserve-content">
          { city ? (
            <div className="reserve-scooter-container">
              <div className="reserve-content-header">
                {/* Input name */}
                <div className="reserve-input-name">
                  <label htmlFor="name">Your Name:</label>
                  <input type="text" id="name" value={currentUser.name} placeholder="Mike Tyson" />
                </div>
              </div>
              <div className="reserve-content-body">
                <h2>Available scooters</h2>
                {content}
                <button type="button" className="reserve-action-button">
                  Reserve a scooter
                </button>
              </div>
            </div>
          )
            : (
              <div className="reserve-action-container">
                <div className="reserve-action-content">
                  {/* City list dropdown */}
                  <div className="reserve-city-list-container">
                    {/* <!-- Greater Accra Region--> */}
                    <select id="city" name="city" onChange={getCity}>
                      <option value="">Select City</option>
                      <option value="Accra">Accra</option>
                      <option value="Atsiaman">Atsiaman</option>
                      <option value="Dome">Dome</option>
                      <option value="Gbawe">Gbawe</option>
                      <option value="Medina Estates">Medina Estates</option>
                      <option value="Nungua">Nungua</option>
                      <option value="Tema">Tema</option>
                      <option value="Teshi Old Town">Teshi Old Town</option>
                    </select>
                  </div>
                </div>
              </div>
            ) }
        </div>
      </div>
    </div>
  );
};

export default Reserve;
