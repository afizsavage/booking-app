import axios from 'axios';
import qs from 'qs';

const token = localStorage.getItem('token');

const addNewScooter = async (object) => {
  console.log(object);

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    url: 'https://sheltered-tor-84017.herokuapp.com/api/v2/scooters/new',
    data: qs.stringify(object),
  };

  const response = await axios(options);
  console.log(response);
  return response.data;
};

export default addNewScooter;
