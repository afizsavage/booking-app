/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logUserIn } from '../../redux/users/userSlice';
import AuthForm from './authform';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resMsg, setResmsg] = useState('');

  const setToken = (token) => {
    localStorage.setItem('token', token);
  };

  const setCurrentUser = (user) => {
    const userObj = JSON.stringify(user);
    localStorage.setItem('user', userObj);
  };

  const endpoint = 'https://sheltered-tor-84017.herokuapp.com/api/v1/auth/login';
  const onLogin = (res) => {
    setResmsg(`Welcome ${res.data.user.name} !`);
    setIsSubmitted(true);
    setCurrentUser(res.data.user);
    setToken(res.data.jwt);
    dispatch(logUserIn(res.data.user));
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  return isSubmitted ? (
    <div className="w-full h-full flex justify-center items-center">
      <h2 className="text-amber-500 font-semibold text-2xl">{resMsg}</h2>
    </div>
  ) : (
    <AuthForm endpoint={endpoint} button="Login" onResponse={onLogin} />
  );
};

export default Login;
