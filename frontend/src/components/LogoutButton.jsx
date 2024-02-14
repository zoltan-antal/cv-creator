import Button from './Button';

const LogoutButton = () => {
  const handleClick = () => {
    localStorage.removeItem('cvCreatorAuthToken');
    localStorage.removeItem('cvList');
    localStorage.removeItem('cvId');
    location.reload();
  };

  return <Button name={'Logout'} className="dark" onClick={handleClick} />;
};

export default LogoutButton;
