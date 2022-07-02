import axios from 'axios';

const token = localStorage.getItem('token');

const myReservations = async () => {
  const options = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    url: 'https://sheltered-tor-84017.herokuapp.com/api/v2/my_reservations',
  };

  const response = await axios(options);
  return response.data;
};

export default myReservations;
