import '../styles/CvName.css';
import { useState } from 'react';
// import { useCvData, useCvDataDispatch } from '../contexts/CvDataContext';
// import { useSession } from '../contexts/SessionContext';
import Button from './Button';
// import cvService from '../services/cv';
import { useDispatch, useSelector } from 'react-redux';
import { discardTempCV, saveTempCV, updateTempCV } from '../slices/cvDataSlice';

function CvName() {
  // const cvData = useCvData();
  // const dispatchCvData = useCvDataDispatch();
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();
  // const session = useSession();
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
                    // dispatchCvData({
                    //   type: 'update',
                    //   path: ['name'],
                    //   value: e.target.value,
                    // })
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
                      // dispatchCvData({
                      //   type: 'discard',
                      //   path: ['name'],
                      // });
                      dispatch(discardTempCV());
                      setMode('view');
                    }}
                  />
                  <Button
                    type={'save'}
                    className="dark"
                    onClick={async () => {
                      // dispatchCvData({
                      //   type: 'save',
                      //   path: ['name'],
                      // });
                      await dispatch(saveTempCV());
                      // if (session) {
                      //   cvService.updateCV(
                      //     cvData.selectedCvId,
                      //     cvData.cvLists.tempCvData[cvData.selectedCvIndex]
                      //   );
                      // }
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
