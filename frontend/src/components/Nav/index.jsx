import './Nav.css';
import { useRef } from 'react';
import Button from '../Button';
import CVListDialog from './CVListDialog';
import LoginDialog from './LoginDialog';
import LogoutButton from './LogoutButton';
import { useSelector } from 'react-redux';
import UserDialog from './UserDialog';

const Nav = () => {
  const user = useSelector((state) => state.user);

  const selectCVDialogRef = useRef(null);
  const userDialogRef = useRef(null);
  const loginDialogRef = useRef(null);

  return (
    <nav>
      <Button
        name={'My CVs'}
        className="dark"
        onClick={() => selectCVDialogRef.current.showModal()}
      />
      {user && (
        <Button
          name={'User settings'}
          className="dark"
          onClick={() => userDialogRef.current.showModal()}
        />
      )}
      {!user ? (
        <Button
          name={'Login'}
          className="dark"
          onClick={() => loginDialogRef.current.showModal()}
        />
      ) : (
        <LogoutButton />
      )}
      <CVListDialog ref={selectCVDialogRef} />
      <UserDialog ref={userDialogRef} />
      <LoginDialog ref={loginDialogRef} />
    </nav>
  );
};

export default Nav;
