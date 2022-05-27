import React, { useState, useEffect } from 'react';
import '../index.css';
import { BsFillGearFill, BsArrowRightCircle } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

// const token = localStorage.getItem('token');
// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };
const BikeDetails = () => {
  const { bikeId } = useParams();
  const [bike, setBike] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchBike = async () => {
    const res = await axios.get(`https://sheltered-tor-84017.herokuapp.com/api/v2/motorcyles/${bikeId}`);
    setBike(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchBike();
  }, []);

  if (loading) {
    return (<p>loading</p>);
  }

  return (
    <div className="flex flex-col gap-[30%] p-0 items-stretch justify-center md:w-4/5">
      <div key={bike.id} className="flex flex-col gap-[30%]">
        <div className="flex flex-col  gap-[10%] items-center md:flex-row md:gap-[10%] md:items-center">
          <div className="w-80 h-80 rounded-full mx-auto relative mb-4 flex sm:flex-row justify-between items-center content-center md:w-[30rem] md:h-[15rem] md:rounded-full ">
            <div className="flex justify-center items-center content-center">
              <img className="w-[100%] h-[100%] md:w-[100%] md:h-[100%]" src={`https://sheltered-tor-84017.herokuapp.com/${bike.image.url}`} alt="img" />
            </div>
          </div>
          <div className="flex mobile flex-col justify-center sm:pl-0 items-center gap-4">
            <div className="flex justify-center w-full">
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
                </span>
                {' '}
              </h1>
            </div>
            <p className="flex justify-center items-center w-[100%] ">
              {' '}
              {bike.description}
              {' '}
            </p>
            <div className="w-[100%] ">
              <p className="bg-gray-200 p-2 flex justify-between">
                <span>Name:</span>
                {bike.title}
              </p>
            </div>
            <div className="w-[100%] ">
              <p className="flex justify-between">
                <span>Year:</span>
                {bike.year}
              </p>
            </div>
            <div className="w-[100%] ">
              <p className="bg-gray-200 p-2 flex justify-between">
                <span>Price:</span>
                {bike.price}
              </p>
            </div>
            <div>
              <Link to={`/reserve/${bike.id}`}>
                <div className="flex bg-red-500    hover:bg-amber-600/80 text-white font-bold py-1 px-4 rounded w-42">
                  <BsFillGearFill className="mx-2" size={30} color="white" />
                  <button type="button" className="">
                    RESERVE
                  </button>
                  <BsArrowRightCircle className="mx-2" size={30} color="white" />
                </div>
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
