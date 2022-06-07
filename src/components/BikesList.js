// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteBike } from '../redux/bikes/bikesSlice';
import { Loading } from './Carousel';
// import PrimaryButton from './PrimaryButton';

const MyScooters = ({ scooters }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const scooterICreated = scooters.filter((scooter) => scooter.user.id === currentUser.id);
  const dispatch = useDispatch();

  const deleteScooter = (id) => {
    dispatch(deleteBike(id));
  };

  return (
    <tbody>
      {scooterICreated.map((scooter) => (
        <tr key={scooter.id}>
          <td className="px-2 py-4">{scooter.title}</td>
          <td className="px-2 py-4">{scooter.year}</td>
          <td className="px-2 py-4">{scooter.model}</td>
          <td className="px-2 py-4" id={scooter.id}>
            {currentUser.id === scooter.user.id && (
            <button type="button" onClick={() => deleteScooter(scooter.id)}>
              Delete
            </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const BikesList = () => {
  const { bikes } = useSelector((state) => state.bikes);
  const { isLoading } = useSelector((state) => state.bikes);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchBikes());
  // }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full my-10">
      <h2 className="font-bold text-3xl text-center mb-10">My Scooters</h2>
      <table className="table-auto w-4/5 max-w-xl mx-auto text-sm md:text-lg">
        <thead className="">
          <tr>
            <th className="p-2 text-left">Scooter Name</th>
            <th className="p-2 text-left">Scooter Year</th>
            <th className="p-2 text-left">Scooter Model</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <MyScooters scooters={bikes} />
      </table>
    </section>
  );
};

export default BikesList;

MyScooters.propTypes = {
  scooters: PropTypes.objectOf.isRequired,
};
