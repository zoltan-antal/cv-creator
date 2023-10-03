import '../styles/CvListDialog.css';
import { forwardRef } from 'react';
import { useCvData, useCvDataDispatch } from '../utils/CvDataContext';
import deleteCv from '../utils/deleteCv';
import addNewCv from '../utils/addNewCv';
import Button from './Button';

const CvListDialog = forwardRef(function CvListDialog(_, ref) {
  const cvData = useCvData();
  const dispatchCvData = useCvDataDispatch();

  return (
    <dialog ref={ref} className="cv-list">
      <div className="dialog-content">
        {(() => {
          return cvData.cvLists.savedCvData
            .toSorted((a, b) => (a.cvName >= b.cvName ? 1 : -1))
            .map((cv) => {
              return (
                <div
                  key={cv.cvId}
                  className={`cv${
                    cv.cvId === cvData.selectedCvId ? ' selected' : ''
                  }`}
                  onClick={() => {
                    localStorage.setItem('cvId', cv.cvId);
                    dispatchCvData({ type: 'reloadCvData' });
                    // ref.current.close();
                  }}
                >
                  <p>{cv.cvName}</p>
                  <div className="manage-cv">
                    <Button
                      type={'remove'}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCv(cv.cvId);
                        dispatchCvData({ type: 'reloadCvData' });
                      }}
                    />
                  </div>
                </div>
              );
            });
        })()}
        <div className="buttons">
          <Button
            type={'add'}
            onClick={() => {
              addNewCv();
              dispatchCvData({ type: 'reloadCvData' });
            }}
          />
          <Button
            className="done"
            name="Done"
            onClick={() => ref.current.close()}
          />
        </div>
      </div>
    </dialog>
  );
});

export default CvListDialog;
