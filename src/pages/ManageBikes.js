/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import BikesList from '../components/BikesList';
import FormError from '../components/FormError';
import PrimaryButton from '../components/PrimaryButton';
import { addBike } from '../redux/bikes/bikesSlice';

const ManageBikes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formSuccess, setFormSuccess] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const body = { bike: { ...data } };
    dispatch(addBike(body));
    reset();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <section className="w-full md:w-4/5 pt-20 md:py-20 overflow-y-auto h-screen">
      <h1 className="font-bold text-2xl md:text-5xl text-center uppercase mb-10">
        Manage bikes
      </h1>
      <p
        className={`text-green-600 text-center my-2 opacity-0 transition-opacity ${
          formSuccess && 'opacity-100'
        }`}
      >
        Added successfully
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-center w-4/5 max-w-xl mx-auto gap-5 mb-10 md:mb-20"
      >
        <input
          type="text"
          className="border-2 border-amber-500 rounded w-full p-1"
          {...register('make', { required: true, maxLength: 50 })}
          placeholder="Bike make"
        />
        {errors.make && <FormError>Must fill out this field</FormError>}
        <input
          type="text"
          className="border-2 border-amber-500 rounded w-full p-1"
          placeholder="Bike model"
          {...register('model', { required: true, maxLength: 50 })}
        />
        {errors.model && <FormError>Must fill out this field</FormError>}
        <input
          type="number"
          className="border-2 border-amber-500 rounded w-full p-1"
          placeholder="Bike year"
          {...register('year', { required: true, min: 1000, max: 3000 })}
        />
        {errors.year && <FormError>{errors.year?.type}</FormError>}
        <input
          type="number"
          className="border-2 border-amber-500 rounded w-full p-1"
          placeholder="Bike price"
          {...register('price', { required: true, min: 1 })}
        />
        {errors.price && <FormError>{errors.price?.type}</FormError>}
        <input
          type="text"
          className="border-2 border-amber-500 rounded w-full p-1"
          placeholder="Bike image link"
          {...register('image', { required: true })}
        />
        {errors.image && <FormError>This field is required</FormError>}
        <textarea
          placeholder="Bike description"
          className="border-2 border-amber-500 rounded w-full p-1"
          {...register('description', { required: true })}
          rows="8"
        />
        {errors.description && <FormError>Must fill out this field</FormError>}
        <PrimaryButton btnType="submit">add bike</PrimaryButton>
      </form>
      <BikesList />
    </section>
  );
};
export default ManageBikes;