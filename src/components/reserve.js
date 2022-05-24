import { useSelector } from 'react-redux';
import { selectAvailableScooterIds, useGetAvailableScotersQuery } from '../redux/reservations/reservationsSlice';

const Reserve = () => {
  const { isLoading, isSuccess, isError } = useGetAvailableScotersQuery();

  const orderedScootersIds = useSelector(selectAvailableScooterIds);
  // const scootersStatus = useSelector(getAvailableScootersStatus);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Error!</p>;
  }
  if (isSuccess) {
    content = orderedScootersIds.map((id) => <p key={id}>{id}</p>);
  }

  return <div>{content}</div>;
};

export default Reserve;
