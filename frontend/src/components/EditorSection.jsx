import '../styles/EditorSection.css';
import _ from 'lodash';
import { useState } from 'react';
import { useCvData, useCvDataDispatch } from '../contexts/CvDataContext';
import { useSession } from '../contexts/SessionContext';
import Button from './Button';
import mapEditFields from '../utils/mapEditFields';
import mapViewFields from '../utils/mapViewFields';
import cvService from '../services/cv';

function EditorSection({ children, title, path, isActive, onShow, onHide }) {
  const cvData = useCvData();
  const dispatchCvData = useCvDataDispatch();
  const session = useSession();
  const [mode, setMode] = useState('view');

  return (
    <div className="editor-section">
      <div className="header" onClick={isActive ? onHide : onShow}>
        <h2 className="title">{title}</h2>
        {(() => {
          if (isActive) {
            return <Button type={'collapse'} />;
          } else {
            return <Button type={'expand'} />;
          }
        })()}
      </div>
      <div className="content" style={!isActive ? { display: 'none' } : {}}>
        {(() => {
          switch (mode) {
            case 'view':
              return (
                <>
                  {mapViewFields({
                    data: _.get(cvData, [
                      'cvLists',
                      'tempCvData',
                      cvData.selectedCvIndex,
                      ...path,
                    ]),
                  })}
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
                  {children}
                  {mapEditFields({
                    data: _.get(cvData, [
                      'cvLists',
                      'tempCvData',
                      cvData.selectedCvIndex,
                      ...path,
                    ]),
                    path: path,
                  })}
                  <div className="manage-section">
                    <Button
                      type={'discard'}
                      className="dark"
                      onClick={() => {
                        dispatchCvData({
                          type: 'discard',
                          path: path,
                        });
                        setMode('view');
                      }}
                    />
                    <Button
                      type={'save'}
                      className="dark"
                      onClick={async () => {
                        dispatchCvData({
                          type: 'save',
                          path: path,
                        });
                        if (session) {
                          cvService.updateCV(
                            cvData.selectedCvId,
                            cvData.cvLists.tempCvData[cvData.selectedCvIndex]
                          );
                        }
                        setMode('view');
                      }}
                    />
                  </div>
                </>
              );
          }
        })()}
      </div>
    </div>
  );
}

export default EditorSection;
