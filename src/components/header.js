import PropTypes from 'prop-types';
import { FcMenu } from 'react-icons/fc';

const Header = ({ setRenderAside }) => (
  <header className="flex justify-between lg:hidden px-2 py-2 border-b-2">
    <button
      className="p-1 border"
      type="button"
      onClick={() => setRenderAside(true)}
    >
      {' '}
      <FcMenu className="text-xl text-gray-700" />
    </button>
    <span className="block">Logo</span>
    <div>
      {' '}
      <a href="/">Login</a>
    </div>
  </header>
);
export default Header;

Header.propTypes = {
  setRenderAside: PropTypes.func.isRequired,
};
