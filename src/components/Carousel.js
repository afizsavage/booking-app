import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from './CarouselItem';
import { fetchBikes } from '../redux/bikes/bikesSlice';

export const CarouselMobile = () => {
  const dispatch = useDispatch();
  const bikes = useSelector((state) => state.bikes);

  useEffect(() => {
    dispatch(fetchBikes());
  }, []);

  return (
    <section className="px-10 md:hidden">
      <Carousel showThumbs={false} showIndicators={false} showStatus={false}>
        {bikes.bikes.map((bike) => (
          <CarouselItem key={bike.id} bike={bike} />
        ))}
      </Carousel>
    </section>
  );
};

export const CarouselDesktop = () => {
  const dispatch = useDispatch();
  const bikes = useSelector((state) => state.bikes);

  useEffect(() => {
    if (bikes.length > 0) dispatch(fetchBikes());
  }, []);

  return (
    <section className="py-10 hidden md:block">
      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        centerMode
        centerSlidePercentage={45}
      >
        {bikes.bikes.map((bike) => (
          <CarouselItem key={bike.id} bike={bike} />
        ))}
      </Carousel>
    </section>
  );
};

const ResponsiveCarousel = () => (
  <>
    <CarouselMobile />
    <CarouselDesktop />
  </>
);

export default ResponsiveCarousel;
