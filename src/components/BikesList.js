import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes, deleteBike } from '../redux/bikes/bikesSlice';
import PrimaryButton from './PrimaryButton';

const BikesList = () => {
  const { bikes } = useSelector((state) => state.bikes);
  const { isLoading } = useSelector((state) => state.bikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBikes());
  }, []);

  const deleteScooter = (e) => {
    e.preventDefault();
    const [id] = e.target.parentNode.id.split('-');
    dispatch(deleteBike(id));
  };

  return (
    <section>
      <h2 className="font-bold text-3xl text-center mb-10">List of scooters</h2>
      {isLoading && <p>Loading...</p>}
      <table className="table-auto w-4/5 max-w-xl mx-auto text-sm md:text-lg">
        <thead className="">
          <tr>
            <th className="p-2 text-left">Scooter Year</th>
            <th className="p-2 text-left">Scooter Model</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {bikes.map((scooter) => (
            <tr key={scooter.id}>
              <td className="px-2 py-4">{scooter.year}</td>
              <td className="px-2 py-4">{scooter.model}</td>
              <td className="px-2 py-4" id={scooter.id}><PrimaryButton btnType="button" is onClick={deleteScooter}>Delete</PrimaryButton></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BikesList;
