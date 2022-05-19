import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const links = [
  { name: 'Scooters', path: '/' },
  { name: 'Reserve', path: '/reserve' },
  { name: 'My Reservations', path: '/reservations' },
  { name: 'Add Scooter', path: '/add' },
  { name: 'Delete Scooter', path: '/delete' },
];

const NavItem = ({ name, path }) => (
  <li>
    <NavLink to={path} className="link">
      {name}
    </NavLink>
  </li>
);

const SideBar = () => (
  <aside>
    <div>
      {' '}
      <span>Logo</span>
      <ul>
        {links.map((link) => (
          <NavItem
            key={links.indexOf(link)}
            name={link.name}
            path={link.path}
          />
        ))}
      </ul>
    </div>
  </aside>
);

export default SideBar;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
