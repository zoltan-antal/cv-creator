import '../styles/EditorSection.css';
import _ from 'lodash';
import { useContext, useState } from 'react';
import { CvDataContext, CvDataDispatchContext } from '../utils/CvDataContext';
import Button from './Button';
import mapEditFields from '../utils/mapEditFields';
import mapViewFields from '../utils/mapViewFields';

function EditorSection({ children, title, path, isActive, onShow, onHide }) {
  const cvData = useContext(CvDataContext);
  const dispatch = useContext(CvDataDispatchContext);
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
                    data: _.get(cvData, ['tempCvData', ...path]),
                  })}
                  <Button type={'edit'} onClick={() => setMode('edit')} />
                </>
              );

            case 'edit':
              return (
                <>
                  {children}
                  {mapEditFields({
                    data: _.get(cvData, ['tempCvData', ...path]),
                    path: path,
                  })}
                  <div className="manage-section">
                    <Button
                      type={'discard'}
                      onClick={() => {
                        dispatch({
                          type: 'discard',
                          path: path,
                        });
                        setMode('view');
                      }}
                    />
                    <Button
                      type={'save'}
                      onClick={() => {
                        dispatch({
                          type: 'save',
                          path: path,
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
    </div>
  );
}

export default EditorSection;
