/* eslint-disable react/jsx-indent */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from './authform';

const SignUp = () => {
  const navigate = useNavigate();
  const endpoint = 'https://sheltered-tor-84017.herokuapp.com/api/v1/users/register';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resMsg, setResmsg] = useState('');

  const onSignUp = () => {
    setResmsg('Thanks for joining us!');
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  return isSubmitted ? (
    <div className="w-full h-full flex justify-center items-center">
      <h2 className="text-emerald-500 font-semibold text-2xl">{resMsg}</h2>
    </div>
  ) : (<AuthForm endpoint={endpoint} onResponse={onSignUp} button="Sign Up" />);
};

export default SignUp;
