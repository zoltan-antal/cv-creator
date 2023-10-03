import '../styles/CvListDialog.css';
import { forwardRef, useState } from 'react';
import parseDates from '../utils/parseDates';
import { useCvDataDispatch } from '../utils/CvDataContext';
import deleteCv from '../utils/deleteCv';
import Button from './Button';

const CvListDialog = forwardRef(function CvListDialog(_, ref) {
  const [currentCvId, setCurrentCvId] = useState(localStorage.getItem('cvId'));
  const [count, setCount] = useState(0);
  const dispatchCvData = useCvDataDispatch();

  return (
    <dialog ref={ref} className="cv-list">
      <div className="dialog-content">
        {(() => {
          const cvList = parseDates(JSON.parse(localStorage.getItem('cvList')));
          return cvList.map((cv) => {
            return (
              <div
                key={cv.cvId}
                className={`cv${cv.cvId === currentCvId ? ' selected' : ''}`}
                onClick={() => {
                  localStorage.setItem('cvId', cv.cvId);
                  dispatchCvData({ type: 'openCv', cvId: cv.cvId });
                  setCurrentCvId(cv.cvId);
                  setCount(count + 1);
                  ref.current.close();
                }}
              >
                <p>{cv.cvName}</p>
                <Button
                  type={'remove'}
                  onClick={() => {
                    // console.log(
                    //   'CvListDialog at click, cvList: ' +
                    //     JSON.parse(localStorage.getItem('cvList'))
                    // );
                    // console.log(JSON.parse(localStorage.getItem('cvList')));
                    // console.log(
                    //   'CvListDialog at click, cvId: ' +
                    //     localStorage.getItem('cvId')
                    // );
                    const cvId = deleteCv(cv.cvId);
                    // console.log(
                    //   'CvListDialog after deleteCv, cvList: ' +
                    //     JSON.parse(localStorage.getItem('cvList'))
                    // );
                    // console.log(JSON.parse(localStorage.getItem('cvList')));
                    // console.log(
                    //   'CvListDialog after deleteCv, stored cvId: ' +
                    //     localStorage.getItem('cvId')
                    // );
                    // console.log(
                    //   'CvListDialog after deleteCv, returned cvId: ' + cvId
                    // );
                    dispatchCvData({ type: 'openCv', cvId: cvId });
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
