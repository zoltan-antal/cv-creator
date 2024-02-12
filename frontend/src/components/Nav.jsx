import '../styles/Nav.css';
import { useRef } from 'react';
import { useCvDataDispatch } from '../utils/CvDataContext';
import addNewCv from '../utils/addNewCv';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';
import CvListDialog from './CvListDialog';
import LoginDialog from './LoginDialog';

function Nav() {
  const dispatchCvData = useCvDataDispatch();

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
        onClick={() => {
          addNewCv({ type: 'example' });
          dispatchCvData({ type: 'reloadCvData' });
        }}
      />
      <Button
        name={'CV list'}
        className="dark"
        onClick={() => selectCvDialogRef.current.showModal()}
      />
      <Button
        name={'Login'}
        className="dark"
        onClick={() => loginDialogRef.current.showModal()}
      />
      <ConfirmDialog
        ref={clearConfirmDialogRef}
        message="Are you sure you want to clear all contents of this CV?"
        onConfirm={() => dispatchCvData({ type: 'clearAllData' })}
      />
      <CvListDialog ref={selectCvDialogRef} />
      <LoginDialog ref={loginDialogRef} />
    </nav>
  );
}

export default Nav;
