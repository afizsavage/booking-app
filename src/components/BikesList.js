import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBike, fetchBikes } from '../redux/bikes/bikesSlice';
import PrimaryButton from './PrimaryButton';

const BikesList = () => {
  const { bikes } = useSelector((state) => state.bikes);
  const { isLoading } = useSelector((state) => state.bikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBikes());
  }, []);

  const handleDelete = (id) => dispatch(deleteBike(id));

  return (
    <section>
      <h2 className="font-bold text-3xl text-center mb-10">List of bikes</h2>
      {isLoading && <p>Loading...</p>}
      <table className="table-auto w-4/5 max-w-xl mx-auto text-sm md:text-lg">
        <thead className="">
          <tr>
            <th className="p-2 text-left">Bike make</th>
            <th className="p-2 text-left">Bike model</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td className="px-2 py-4">{bike.make}</td>
              <td className="px-2 py-4">{bike.model}</td>
              <td className="px-2 py-4">
                <PrimaryButton onClick={() => handleDelete(bike.id)}>
                  Delete
                </PrimaryButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BikesList;
