/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState /* useEffect */ } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectAvailableScooterIds,
  selectAllReservation,
  useGetAvailableScotersQuery,
  useGetReservationQuery,
} from '../redux/reservations/reservationsSlice';
import '../stylesheets/reservation.css';
// import store from '../redux/configureStore';
import addNewReservation from '../services/addReservationApi';

const Reserve = () => {
  const { id } = useParams();
  // const id = '2';
  const { isLoading, isSuccess, isError } = useGetAvailableScotersQuery();
  const {
    data: selectedScooter,
    isLoading: isLoadingReservation,
    isSuccess: isSuccessReservation,
    isError: isErrorReservation,
  } = useGetReservationQuery(id);

  const orderedScootersIds = useSelector(selectAvailableScooterIds);
  const reservation = useSelector(selectAllReservation);
  console.log('heeeey', reservation);
  // const scootersStatus = useSelector(getAvailableScootersStatus);

  const getId = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    useGetReservationQuery(e.target.id);
  };

  let chosenScooter;

  const [city, setCity] = useState(null);
  // const [scooterId, setScooterId] = useState(chosenScooter.id);
  // const [selectedScooter, setSelectedScooter] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const getCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const read = (e) => {
    e.preventDefault();
    console.log(e.target.value);
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

  const getFormData = () => {
    const duration = document.getElementById('duration').value;
    const price = document.getElementById('price').value;
    const date = document.getElementById('date').value;
    const city = document.getElementById('city').value;

    return {
      duration: Number(duration),
      price: Number(price),
      date,
      city,
      motorcycle_id: chosenScooter.id,
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();

    getFormData();
    addNewReservation(getFormData());
  };

  // const saveScooterId = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.id);
  // };

  if (isLoadingReservation) {
    chosenScooter = <p>Loading...</p>;
  }
  if (isErrorReservation) {
    chosenScooter = <p>Error!</p>;
  }
  if (isSuccessReservation) {
    chosenScooter = selectedScooter;
    // chosenScooter =
    // chosenScooter = ids.map((id) => (
    //   <p key={id}>
    //     {entities[id].make}
    //     {entities[id].model}
    //   </p>
    // ));
  }

  console.log('chosenScooter', chosenScooter);

  return (
    <div className="reserve-wrapper">
      {city ? (
        <p>Provide additional details</p>
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
                {/* form */}
                <form className="reserve-form">
                  <label className="reserve-form-label">
                    <span className="reserve-form-label-text">
                      {/* Name */}
                    </span>
                    <input
                      className="reserve-form-input"
                      type="text"
                      name="name"
                      id="name"
                      value={currentUser.name}
                      placeholder="Name"
                      onChange={read}
                    />
                  </label>
                  <label className="reserve-form-label">
                    <span className="reserve-form-label-text">
                      {/* Duration */}
                    </span>
                    <input
                      className="reserve-form-input"
                      type="text"
                      name="duration"
                      id="duration"
                      placeholder="Duration"
                      onChange={read}
                    />
                  </label>
                  <label className="reserve-form-label">
                    <span className="reserve-form-label-text">
                      {/* City */}
                    </span>
                    <input
                      className="reserve-form-input"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      onChange={getCity}
                    />
                  </label>
                  <label className="reserve-form-label">
                    <span className="reserve-form-label-text">
                      {/* Price */}
                    </span>
                    <input
                      className="reserve-form-input"
                      type="text"
                      name="price"
                      id="price"
                      placeholder="Price"
                      onChange={read}
                    />
                  </label>
                  <label className="reserve-form-label">
                    <span className="reserve-form-label-text">
                      {/* date */}
                    </span>
                    <input
                      className="reserve-form-input"
                      type="date"
                      name="date"
                      id="date"
                      placeholder="Date"
                      onChange={read}
                    />
                  </label>
                </form>

              </div>
              <div className="reserve-content-body">
                {Object.prototype.hasOwnProperty.call(chosenScooter, 'id') ? (
                  <div className="reserve-scooter-selected">
                    <h2>Selected Scooter</h2>
                    {/* <p> */}
                    {chosenScooter !== null ? (
                      <div className="reserve-scooter-selected-content">
                        <img
                          src={`https://sheltered-tor-84017.herokuapp.com/${chosenScooter.image.default.url}`}
                          alt="scooter"
                        />
                        <p>
                          {chosenScooter.title}
                          {' '}
                          <span className="scooter-model">
                            {chosenScooter.model}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <p>No scooter selected</p>
                    )}
                    {/* </p> */}
                  </div>
                ) : (
                  <div className="reserve-scooter-list">
                    <h2>Select scooter</h2>
                    {content}
                  </div>
                )}
                <button type="button" className="reserve-action-button" onClick={onSubmit}>
                  {chosenScooter.available ? 'Reserve scooter' : 'Scooter reserved'}
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
