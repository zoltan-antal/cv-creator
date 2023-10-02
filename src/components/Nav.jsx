import '../styles/Nav.css';
import { useRef } from 'react';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';

function Nav() {
  const dispatchCvData = useCvDataDispatch();
  const clearConfirmDialogRef = useRef(null);

  return (
    <nav>
      <Button
        name={'Clear'}
        onClick={() => clearConfirmDialogRef.current.showModal()}
      />
      <ConfirmDialog
        ref={clearConfirmDialogRef}
        message="Are you sure you want to clear all contents of this CV?"
        onConfirm={() => dispatchCvData({ type: 'clearAllData' })}
      />
    </nav>
  );
}

export default Nav;
