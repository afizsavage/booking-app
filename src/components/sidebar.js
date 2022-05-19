import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialGooglePlus,
  TiSocialPinterest,
  TiSocialVimeo,
} from 'react-icons/ti';

const links = [
  { name: 'Scooters', path: '/' },
  { name: 'Reserve', path: '/reserve' },
  { name: 'My Reservations', path: '/reservations' },
  { name: 'Add Scooter', path: '/add' },
  { name: 'Delete Scooter', path: '/delete' },
];

const NavItem = ({ name, path }) => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <li>
      <NavLink
        to={path}
        className={
          currentRoute === path
            ? 'pl-2 py-2 block bg-emerald-500 w-full'
            : 'pl-2 py-2 block w-full '
        }
      >
        {name}
      </NavLink>
    </li>
  );
};

const SideBar = () => (
  <aside className="flex flex-col justify-between h-screen w-1/6 absolute border-r-2 py-6">
    <div>
      {' '}
      <span className="h-28 block">Logo</span>
      <ul className="pl-5">
        {links.map((link) => (
          <NavItem
            key={links.indexOf(link)}
            name={link.name}
            path={link.path}
          />
        ))}
      </ul>
    </div>
    <div>
      <ul className="flex justify-center mb-3">
        <li>
          <TiSocialTwitter />
        </li>
        <li>
          <TiSocialFacebook />
        </li>
        <li>
          <TiSocialGooglePlus />
        </li>
        <li>
          <TiSocialVimeo />
        </li>
        <li>
          <TiSocialPinterest />
        </li>
      </ul>
      {/* <span className="text-sm w-full text-center block">
        © {new Date().getFullYear()} Booking App
      </span> */}
    </div>
  </aside>
);

export default SideBar;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
