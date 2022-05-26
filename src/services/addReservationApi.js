/* eslint-disable camelcase */
import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://sheltered-tor-84017.herokuapp.com/api/v2';

// const config = {
//   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
// };

const token = localStorage.getItem('token');
console.log('Toooken', token);

const addNewReservation = async (object) => {
  console.log(object);

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    url: '/reservations/new',
    data: qs.stringify(object),
  };

  const response = await axios(options);
  console.log(response);
  return response.data;
};

export default addNewReservation;
