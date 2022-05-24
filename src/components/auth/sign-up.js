/* eslint-disable react/jsx-indent */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthForm from './authform';

const SignUp = () => {
  const navigate = useNavigate();
  const endpoint = 'https://sheltered-tor-84017.herokuapp.com/api/v1/users/register';
  const userState = useSelector((state) => state.user);

  const onSignUp = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (userState.isLoggedIn) {
      navigate('/');
    }
  });

  return (
    <AuthForm endpoint={endpoint} onResponse={onSignUp} button="Sign Up" />
  );
};

export default SignUp;
