import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti';

const socialIcons = [
  <TiSocialFacebookCircular key={0} />,
  <TiSocialTwitterCircular key={1} />,
  <TiSocialInstagramCircular key={2} />,
];

const SocialLink = ({ icon }) => (
  <li className="mx-2 mt-3 text-2xl text-gray-400">{icon}</li>
);

const CarouselItem = ({ bike }) => {
  const {
    id, image, description, make, model, color,
  } = bike;

  const bikeColor = color.toLowerCase();

  return (
    <li className="my-5 border-2 p-2 lg:p-0 shadow-md lg:shadow-none lg:border-0 lg:my-0">
      <Link to={`/bikes/${id}`}>
        <div>
          <div className="i-wrap mx-auto w-80 lg:w-full relative flex items-center justify-center">
            <div className={`round mx-auto lg:my-0 lg:mx-0 rounded-full ${bikeColor} `}>
              <div className="absolute left-0 top-0 image-wrapper bg-teal-500 bg-transparent">
                <img
                  src={`https://sheltered-tor-84017.herokuapp.com/${image.url}`}
                  alt="bike"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mt-7 mb-7 font-semibold text-gray-800">
              <span>{make}</span>
              <span>{model}</span>
            </h2>
            <p className="text-sm font-medium text-gray-500">{description}</p>
            <ul className="flex justify-center">
              {socialIcons.map((icon) => (
                <SocialLink icon={icon} key={socialIcons.indexOf(icon)} />
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
};

CarouselItem.propTypes = {
  bike: PropTypes.objectOf().isRequired,
};

export default CarouselItem;

SocialLink.propTypes = {
  icon: PropTypes.element.isRequired,
};
