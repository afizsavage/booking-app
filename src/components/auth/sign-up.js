/* eslint-disable react/jsx-indent */
import { useNavigate } from 'react-router-dom';
import AuthForm from './authform';

const SignUp = () => {
  const navigate = useNavigate();
  const endpoint = 'https://secure-bastion-02263.herokuapp.com/api/v1/users/register';

  const onSignUp = () => {
    navigate('/login');
  };

  return (
    <AuthForm endpoint={endpoint} onResponse={onSignUp} button="Sign Up" />
  );
};

export default SignUp;
