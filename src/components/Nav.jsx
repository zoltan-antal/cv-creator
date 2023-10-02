import '../styles/Nav.css';
import { useRef } from 'react';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';

function Nav() {
  const dispatchCvData = useCvDataDispatch();

  const confirmDialogRef = useRef(null);

  return (
    <nav>
      <Button
        name={'Clear CV'}
        onClick={() => confirmDialogRef.current.showModal()}
      />
      <dialog ref={confirmDialogRef} className="confirm">
        <div className="dialog-content">
          <p>Are you sure you want to erase all data from this CV?</p>
          <div className="buttons">
            <button
              className="yes"
              onClick={() => {
                dispatchCvData({ type: 'clearAllData' });
                confirmDialogRef.current.close();
              }}
            >
              Yes
            </button>
            <button
              className="no"
              onClick={() => confirmDialogRef.current.close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </nav>
  );
}

export default Nav;
