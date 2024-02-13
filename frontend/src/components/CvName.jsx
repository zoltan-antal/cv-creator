import '../styles/CvName.css';
import { useState } from 'react';
import { useCvData, useCvDataDispatch } from '../contexts/CvDataContext';
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
                  {cvData.cvLists.savedCvData[cvData.selectedCvIndex].name}
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
                  name={'name'}
                  value={cvData.cvLists.tempCvData[cvData.selectedCvIndex].name}
                  onChange={(e) =>
                    dispatchCvData({
                      type: 'update',
                      path: ['name'],
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
                        path: ['name'],
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
                        path: ['name'],
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
