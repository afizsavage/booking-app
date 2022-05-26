import ResponsiveCarousel from '../components/Carousel';

const HomePage = () => (
  <section className="relative w-full pt-20 md:p-0 lg:flex justify-center items-center overflow-y-auto h-screen">
    <div className="w-full text-center lg:flex flex-col justify-center h-5/6 ">
      <div className="mb-10">
        <h1 className="font-bold text-2xl md:text-3xl md:mb-2 uppercase text-gray-700">
          Latest Models
        </h1>
        <p className="font-semibold text-sm text-gray-500">
          Please select a motorcyle!
        </p>
      </div>
      <ResponsiveCarousel />
    </div>
  </section>
);

export default HomePage;
