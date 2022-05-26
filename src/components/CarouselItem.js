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
    id, image, description, make, model,
  } = bike;

  return (
    <Link to={`/bikes/${id}`}>
      {/* <div className="hover:opacity-60">
        <div className="bg-amber-500 w-52 h-52 rounded-full mx-auto relative mb-10">
          <div className="absolute -left-3/4 top-1/2 translate-x-1/2 -translate-y-1/2 w-[130%]">
            <img src={`https://sheltered-tor-84017.herokuapp.com/${image.url}`} alt="bike" />
          </div>
        </div>
        <div className="max-w-[240px] mx-auto">
          <h2 className="font-bold text-2xl uppercase mb-4">
            <span className="block">{make}</span>
            <span>{model}</span>
          </h2>
          <p className="text-sm text-gray-400">
            {`${description.slice(0, 100)}...`}
          </p>
        </div>
      </div> */}
      <div>
        <div className="i-wrap w-full relative flex items-center justify-center">
          <div className="round rounded-full bg-red-300 ">
            <div className="absolute left-0 top-0 image-wrapper bg-teal-500 bg-transparent">
              <img
                height={272}
                width={272}
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
  );
};

CarouselItem.propTypes = {
  bike: PropTypes.objectOf().isRequired,
};

export default CarouselItem;

SocialLink.propTypes = {
  icon: PropTypes.element.isRequired,
};
