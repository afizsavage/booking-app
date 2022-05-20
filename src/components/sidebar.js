import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';
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

const socialIcons = [
  <TiSocialTwitter key={0} />,
  <TiSocialFacebook key={1} />,
  <TiSocialGooglePlus key={2} />,
  <TiSocialVimeo key={3} />,
  <TiSocialPinterest key={4} />,
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
            ? 'pl-3 py-2 block bg-emerald-500  text-white w-full font-semibold'
            : 'pl-3 py-2 block w-full font-semibold hover:bg-white'
        }
      >
        {name}
      </NavLink>
    </li>
  );
};

const SocialLink = ({ icon }) => <li className="mx-1">{icon}</li>;

const SideBar = ({ renderAside, setRenderAside }) => (
  <aside
    className={
      renderAside
        ? 'top-0 absolute bg-slate-100 lg:relative flex flex-col justify-between h-screen w-full lg:w-1/6 border-r-2 py-6'
        : 'hidden'
    }
  >
    <div className="lg:hidden absolute right-2 top-2 border">
      <button className="p-1" type="button" onClick={() => setRenderAside()}>
        <MdOutlineClose className="text-xl text-gray-700" />
      </button>
    </div>
    <div>
      {' '}
      <div className=" hidden lg:flex justify-center items-center">
        <span className="h-28 block">Logo</span>
      </div>
      <ul className="pl-5 pt-9 lg:pt-0">
        {links.map((link) => (
          <NavItem
            key={links.indexOf(link)}
            name={link.name}
            path={link.path}
          />
        ))}
      </ul>
      <NavLink to="sign-up" className="py-2 bg-black px-3 border" />
    </div>
    <div>
      <ul className="flex justify-center mb-3">
        {socialIcons.map((icon) => (
          <SocialLink icon={icon} key={icon.key} />
        ))}
      </ul>
      {/* <span className="text-xs font-medium w-full text-center block">
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        Booking App
      </span> */}
    </div>
  </aside>
);

export default SideBar;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

SideBar.propTypes = {
  renderAside: PropTypes.bool.isRequired,
  setRenderAside: PropTypes.func.isRequired,
};

SocialLink.propTypes = {
  icon: PropTypes.element.isRequired,
};
