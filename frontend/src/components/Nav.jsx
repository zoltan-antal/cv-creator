import '../styles/Nav.css';
import { useRef } from 'react';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';
import CvListDialog from './CvListDialog';
import LoginDialog from './LoginDialog';
import LogoutButton from './LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCV, clearCV } from '../slices/cvDataSlice';

function Nav() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const clearConfirmDialogRef = useRef(null);
  const selectCvDialogRef = useRef(null);
  const loginDialogRef = useRef(null);

  return (
    <nav>
      <Button
        name={'Clear'}
        className="dark red"
        onClick={() => clearConfirmDialogRef.current.showModal()}
      />
      <Button
        name={'Example CV'}
        className="dark"
        onClick={async () => {
          dispatch(addNewCV({ type: 'example' }));
        }}
      />
      <Button
        name={'CV list'}
        className="dark"
        onClick={() => selectCvDialogRef.current.showModal()}
      />
      {!user ? (
        <Button
          name={'Login'}
          className="dark"
          onClick={() => loginDialogRef.current.showModal()}
        />
      ) : (
        <LogoutButton />
      )}
      <ConfirmDialog
        ref={clearConfirmDialogRef}
        message="Are you sure you want to clear all contents of this CV?"
        onConfirm={async () => {
          await dispatch(clearCV());
        }}
      />
      <CvListDialog ref={selectCvDialogRef} />
      <LoginDialog ref={loginDialogRef} />
    </nav>
  );
}

export default Nav;
