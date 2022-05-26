import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes } from '../redux/bikes/bikesSlice';

const BikesList = () => {
  const { bikes } = useSelector((state) => state.bikes);
  const { isLoading } = useSelector((state) => state.bikes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBikes());
  }, []);

  return (
    <section>
      <h2 className="font-bold text-3xl text-center mb-10">List of bikes</h2>
      {isLoading && <p>Loading...</p>}
      <table className="table-auto w-4/5 max-w-xl mx-auto text-sm md:text-lg">
        <thead className="">
          <tr>
            <th className="p-2 text-left">Bike Year</th>
            <th className="p-2 text-left">Bike Model</th>
            <th className="p-2 text-left">Bike Price</th>
          </tr>
        </thead>

        <tbody>
          {bikes.map((bike) => (
            <tr key={bike.id}>
              <td className="px-2 py-4">{bike.year}</td>
              <td className="px-2 py-4">{bike.model}</td>
              <td className="px-2 py-4">{bike.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BikesList;
