/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const InputField = ({ name, type, placeholder, register }) => (
//   <input
//     className="py-2 px-3 border"
//     name={name}
//     type={type}
//     placeholder={placeholder}
//     {...register}
//   />
// );

const SignUp = () => {
  const navigate = useNavigate();
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
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-scree w-screen flex flex-col justify-center items-center">
      <h2 className="mb-4 font-medium text-4xl text-grey-700">Booking App</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/6 border p-5 bg-emerald-500"
      >
        {' '}
        <label htmlFor="name" className="my-2 text-white font-medium">
          Full Name
          <input
            className="w-full py-2 px-3 border outline-none text-gray-700 capitalize mt-1"
            name="name"
            type="text"
            placeholder="enter your name"
            {...register('name')}
          />
        </label>
        <label htmlFor="email" className="my-2 text-white font-medium">
          Email
          <input
            name="email"
            className="py-2 px-3 border w-full outline-none text-gray-700 capitalize mt-1"
            type="email"
            placeholder="enter your email"
            {...register('email')}
          />
        </label>
        <label htmlFor="password" className="text-white my-2 font-medium">
          Password
          <input
            name="password"
            className="py-2 px-3 border w-full outline-none text-gray-700 capitalize mt-1"
            type="password"
            placeholder="enter your password"
            {...register('password')}
          />
        </label>
        <label htmlFor="password_confirmation" className="text-white my-2 font-medium">
          Password Confirmation
          <input
            name="password_confirmation"
            className="py-2 px-3 border w-full outline-none text-gray-700 capitalize mt-1"
            type="password"
            placeholder="confirm your password"
            {...register('password_confirmation')}
          />
        </label>
        <button className="w-full bg-red-500 mt-3 py-2 font-semibold text-white" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

// InputField.propTypes = {
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   register: PropTypes.func.isRequired,
// };
