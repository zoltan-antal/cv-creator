import { useDispatch } from 'react-redux';
import Button from './Button';
import { logoutUser } from '../slices/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
  };

  return <Button name={'Logout'} className="dark" onClick={handleClick} />;
};

export default LogoutButton;
