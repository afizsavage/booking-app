import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://sheltered-tor-84017.herokuapp.com/api/v2';

const token = localStorage.getItem('token');
console.log('Toooken', token);

const addNewScooter = async (object) => {
  console.log(object);

  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    url: '/motorcyles/new',
    data: qs.stringify(object),
  };

  const response = await axios(options);
  console.log(response);
  return response.data;
};

export default addNewScooter;
