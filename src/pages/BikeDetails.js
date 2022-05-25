import React, { useState, useEffect } from 'react';
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
            </span>
            {' '}
          </h1>
        </div>

        <div className="flex flex-col  gap-[10%] items-center md:flex-row md:gap-[10%] md:items-center">
          <div className="bg-amber-500 w-80 h-80 rounded-full mx-auto relative mb-4 flex justify-center items-center content-center md:bg-amber-500 md:w-[30rem] md:h-[15rem] md:rounded-full ">
            <div className="flex justify-center items-center content-center">
              <img className="w-[100%] h-[100%] md:w-[100%] md:h-[100%]" src={`https://sheltered-tor-84017.herokuapp.com${bike.image.url}`} alt="img" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-[70%] ">
              <p>
                Title:
                {bike.title}
              </p>
            </div>
            <div className="w-[70%] ">
              <p>
                Year:
                {bike.year}
              </p>
            </div>
            <p className="w-[70%] ">
              {' '}
              {bike.description}
              {' '}
            </p>
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
