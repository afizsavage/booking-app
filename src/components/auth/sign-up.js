/* eslint-disable react/jsx-props-no-spreading */
// import { useStae } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(
        'https://secure-bastion-02263.herokuapp.com/api/v1/users/register',
        data,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-scree w-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-2/6">
        {' '}
        <input
          className="py-2 px-3 border"
          name="name"
          type="text"
          placeholder="enter your name"
          {...register('name')}
        />
        <input
          name="email"
          className="py-2 px-3 border"
          type="email"
          placeholder="enter your email"
          {...register('email')}
        />
        <input
          name="password"
          className="py-2 px-3 border"
          type="password"
          placeholder="enter your password"
          {...register('password')}
        />
        <input
          name="password_confirmation"
          className="py-2 px-3 border"
          type="password"
          placeholder="confirm your password"
          {...register('password_confirmation')}
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
