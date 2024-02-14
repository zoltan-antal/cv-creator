import '../styles/CvListDialog.css';
import { forwardRef } from 'react';
import { useCvData, useCvDataDispatch } from '../contexts/CvDataContext';
import { useSession } from '../contexts/SessionContext';
import deleteCv from '../utils/deleteCv';
import addNewCv from '../utils/addNewCv';
import Button from './Button';

const CvListDialog = forwardRef(function CvListDialog(_, ref) {
  const cvData = useCvData();
  const dispatchCvData = useCvDataDispatch();
  const session = useSession();

  return (
    <dialog ref={ref} className="cv-list">
      <div className="dialog-content">
        <div className="list">
          {(() => {
            return cvData.cvLists.savedCvData
              .toSorted((a, b) => (a.name >= b.name ? 1 : -1))
              .map((cv) => {
                return (
                  <div
                    key={cv.id}
                    className={`cv${
                      cv.id === cvData.selectedCvId ? ' selected' : ''
                    }`}
                    onClick={() => {
                      localStorage.setItem('cvId', cv.id);
                      dispatchCvData({ type: 'reloadCvData' });
                    }}
                  >
                    <p>{cv.name}</p>
                    <div className="manage-cv">
                      <Button
                        type={'remove'}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCv(cv.id);
                          dispatchCvData({ type: 'reloadCvData' });
                        }}
                      />
                    </div>
                  </div>
                );
              });
          })()}
        </div>
        <div className="buttons">
          <Button
            type={'add'}
            onClick={() => {
              addNewCv({ type: 'blank', session });
              dispatchCvData({ type: 'reloadCvData' });
            }}
          />
          <Button
            className="done dark"
            name="Done"
            onClick={() => ref.current.close()}
          />
        </div>
      </div>
    </dialog>
  );
});

export default CvListDialog;
