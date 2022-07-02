import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FcMenu } from 'react-icons/fc';
import { useLocation, NavLink } from 'react-router-dom';
import { logUserOut } from '../redux/users/userSlice';

const Header = ({ setRenderAside }) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteToken = () => {
    localStorage.removeItem('token');
  };

  const removeCurrentUser = () => {
    localStorage.removeItem('user');
  };

  const logout = () => {
    deleteToken();
    removeCurrentUser();
    dispatch(logUserOut());
  };

  return (
    <header
      className={
        currentRoute === '/login' || currentRoute === '/sign-up'
          ? 'hidden'
          : 'flex justify-between z-50 lg:hidden px-2 py-2 border-b-2'
      }
    >
      <button
        className="p-1 border"
        type="button"
        onClick={() => setRenderAside(true)}
      >
        {' '}
        <FcMenu className="text-xl text-gray-700" />
      </button>
      <img className="w-auto h-9" alt="logo" src="/mobile-logo.png" />

      <div className="">
        {userState.isLoggedIn ? (
          <button
            className="py-2  text-amber-500 font-medium"
            onClick={() => logout()}
            type="button"
          >
            Logout
          </button>
        ) : (
          <NavLink to="login" className="py-2 text-amber-500 font-medium">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;

Header.propTypes = {
  setRenderAside: PropTypes.func.isRequired,
};
