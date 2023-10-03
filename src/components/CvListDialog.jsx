import '../styles/CvListDialog.css';
import { forwardRef } from 'react';
import { useCvData, useCvDataDispatch } from '../utils/CvDataContext';
import deleteCv from '../utils/deleteCv';
import Button from './Button';

const CvListDialog = forwardRef(function CvListDialog(_, ref) {
  const cvData = useCvData();
  const dispatchCvData = useCvDataDispatch();

  return (
    <dialog ref={ref} className="cv-list">
      <div className="dialog-content">
        {(() => {
          return cvData.cvLists.savedCvData.map((cv) => {
            return (
              <div
                key={cv.cvId}
                className={`cv${
                  cv.cvId === cvData.selectedCvId ? ' selected' : ''
                }`}
                onClick={() => {
                  localStorage.setItem('cvId', cv.cvId);
                  dispatchCvData({ type: 'reloadCvData' });
                  ref.current.close();
                }}
              >
                <p>{cv.cvName}</p>
                <Button
                  type={'remove'}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCv(cv.cvId);
                    dispatchCvData({ type: 'reloadCvData' });
                  }}
                />
              </div>
            );
          });
        })()}
      </div>
    </dialog>
  );
});

export default CvListDialog;
