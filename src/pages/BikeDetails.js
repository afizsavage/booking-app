import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BikeDetails = () => {
  const { bikeId } = useParams();
  const [bike, setBike] = useState({});
  const fetchBike = async () => {
    const res = await fetch(`https://sheltered-tor-84017.herokuapp.com/api/v2/motorcyles/${bikeId}`);
    const data = await res.json();
    setBike(data);
  };
  useEffect(() => {
    fetchBike();
  }, []);

  return (
    <div className="flex flex-col gap-[30%] p-2 items-center justify-center md:w-4/5">
      <div key={bike.id} className="flex flex-col gap-[30%]">
        <div className="flex  justify-center  w-full">
          <h1 className="font-semibold text-2xl">
            {' '}
            <span>
              {' '}
              {bike.make}
            </span>
            <br />
            <span>{bike.model}</span>
            <span>
              {' '}
              {bike.year}
            </span>
            {' '}
          </h1>
        </div>

        <div className="flex flex-col  gap-[10%] items-center md:flex-row md:gap-[10%] md:items-center">
          <div className="bg-amber-500 w-80 h-80 rounded-full mx-auto relative mb-4 flex justify-center items-center content-center md:bg-amber-500 md:w-[30rem] md:h-[15rem] md:rounded-full ">
            <div className="flex justify-center items-center content-center">
              <img className="w-[100%] h-[100%] md:w-[100%] md:h-[100%]" src={bike.image} alt="img" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="w-[70%] ">
              {' '}
              {bike.description }
              {' '}
            </p>
            <div className="w-[70%] ">
              <p>
                Price:
                {bike.price}
              </p>
            </div>
            <div>
              <Link to="/reserve">
                <button type="button" className="bg-amber-500    hover:bg-amber-600/80 text-white font-bold py-2 px-4 rounded w-52">
                  RESERVE
                </button>
              </Link>
            </div>
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
