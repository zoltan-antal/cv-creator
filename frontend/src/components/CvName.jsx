import '../styles/CvName.css';
import { useState } from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { discardTempCV, saveTempCV, updateTempCV } from '../slices/cvDataSlice';

function CvName() {
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();
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
                  name={'Rename'}
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
                    dispatch(
                      updateTempCV({ value: e.target.value, path: ['name'] })
                    )
                  }
                ></input>
                <div className="manage-section">
                  <Button
                    type={'discard'}
                    className="dark"
                    onClick={() => {
                      dispatch(discardTempCV());
                      setMode('view');
                    }}
                  />
                  <Button
                    type={'save'}
                    className="dark"
                    onClick={async () => {
                      await dispatch(saveTempCV());
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
