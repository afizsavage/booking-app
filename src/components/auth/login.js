/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logUserIn } from '../../redux/users/userSlice';
import AuthForm from './authform';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setToken = (token) => {
    localStorage.setItem('token', token);
  };

  const endpoint = 'https://secure-bastion-02263.herokuapp.com/api/v1/auth/login';
  const onLogin = (res) => {
    setToken(res.data.jwt);
    dispatch(logUserIn(res.data.user));
    navigate('/');
  };

  return (
    <AuthForm endpoint={endpoint} button="Login" onResponse={onLogin} />
  );
};

export default Login;
