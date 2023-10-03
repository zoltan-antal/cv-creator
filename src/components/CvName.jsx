import '../styles/CvName.css';
import { useState } from 'react';
import { useCvData, useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';

function CvName() {
  const cvData = useCvData();
  const dispatchCvData = useCvDataDispatch();
  const [mode, setMode] = useState('view');

  return (
    <div className="cv-name">
      {(() => {
        switch (mode) {
          case 'view':
            return (
              <>
                <pre>
                  {cvData.cvLists.savedCvData[cvData.selectedCvIndex].cvName}
                </pre>
                <Button
                  type={'edit'}
                  className="dark"
                  onClick={() => setMode('edit')}
                />
              </>
            );

          case 'edit':
            return (
              <>
                <input
                  type="text"
                  name={'cvName'}
                  value={
                    cvData.cvLists.tempCvData[cvData.selectedCvIndex].cvName
                  }
                  onChange={(e) =>
                    dispatchCvData({
                      type: 'update',
                      path: ['cvName'],
                      value: e.target.value,
                    })
                  }
                ></input>
                <div className="manage-section">
                  <Button
                    type={'discard'}
                    className="dark"
                    onClick={() => {
                      dispatchCvData({
                        type: 'discard',
                        path: ['cvName'],
                      });
                      setMode('view');
                    }}
                  />
                  <Button
                    type={'save'}
                    className="dark"
                    onClick={() => {
                      dispatchCvData({
                        type: 'save',
                        path: ['cvName'],
                      });
                      setMode('view');
                    }}
                  />
                </div>
              </>
            );
        }
      })()}
    </div>
  );
}

export default CvName;
