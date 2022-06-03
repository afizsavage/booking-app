/* eslint-disable camelcase */
import axios from 'axios';
import qs from 'qs';

const token = localStorage.getItem('token');

const addNewReservation = async (object) => {
  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    url: 'https://sheltered-tor-84017.herokuapp.com/api/v2/reservations/new',
    data: qs.stringify(object),
  };

  const response = await axios(options);
  return response.data;
};

export default addNewReservation;
