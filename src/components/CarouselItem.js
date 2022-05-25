import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CarouselItem = ({ bike }) => {
  const {
    id, make, model, image, description,
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
        <div className="">
          <div className="w-52">
            <img src={`https://sheltered-tor-84017.herokuapp.com/${image.url}`} alt="bike" />
            <h2>
              <span>{make}</span>
              <span>{model}</span>
            </h2>
          </div>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

CarouselItem.propTypes = {
  bike: PropTypes.objectOf().isRequired,
};

export default CarouselItem;
