/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(
        'https://secure-bastion-02263.herokuapp.com/api/v1/users/register',
        data,
      )
      .then(() => {
        navigate('/');
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
