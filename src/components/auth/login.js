/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logUserIn } from '../../redux/users/userSlice';
import AuthForm from './authform';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const setToken = (token) => {
    localStorage.setItem('token', token);
  };

  const setCurrentUser = (user) => {
    const userObj = JSON.stringify(user);
    localStorage.setItem('user', userObj);
  };

  const endpoint = 'https://sheltered-tor-84017.herokuapp.com/api/v1/auth/login';
  const onLogin = (res) => {
    setToken(res.data.jwt);
    setCurrentUser(res.data.user);
    dispatch(logUserIn(res.data.user));
    navigate('/');
  };

  useEffect(() => {
    if (userState.isLoggedIn) {
      navigate('/');
    }
  });

  return <AuthForm endpoint={endpoint} button="Login" onResponse={onLogin} />;
};

export default Login;
