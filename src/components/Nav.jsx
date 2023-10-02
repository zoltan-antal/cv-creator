import '../styles/Nav.css';
import { useRef } from 'react';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';
import ConfirmDialog from './ConfirmDialog';
import addNewCv from '../utils/addNewCv';

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
      <Button
        name={'New'}
        onClick={() => {
          const cvId = addNewCv();
          dispatchCvData({ type: 'openCv', cvId: cvId });
        }}
      />
    </nav>
  );
}

export default Nav;
