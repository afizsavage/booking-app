/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useSelector } from 'react-redux';
import
extendedReservationsSlice,{
  selectAvailableScooterIds,
  selectAllReservation,
  useGetAvailableScotersQuery,
  useGetReservationQuery,
} from '../redux/reservations/reservationsSlice';
import store from '../redux/configureStore';

const Reserve = () => {
  const { isLoading, isSuccess, isError } = useGetAvailableScotersQuery();
  const {
    isLoading: isLoadingReservation,
    isSuccess: isSuccessReservation,
    isError: isErrorReservation,
  } = useGetReservationQuery();

  const orderedScootersIds = useSelector(selectAvailableScooterIds);
  const reservation = useSelector(selectAllReservation);
  // const scootersStatus = useSelector(getAvailableScootersStatus);

  const getId = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    store.dispatch(
      extendedReservationsSlice.endpoints.getReservation.initiate({
        id: e.target.id,
      }),
    );
  };

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Error!</p>;
  }
  if (isSuccess) {
    content = orderedScootersIds.map((id) => (
      <p onClick={getId} key={id} id={id}>
        {id}
      </p>
    ));
  }

  return <div>{content}</div>;
};

export default Reserve;
