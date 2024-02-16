import '../styles/EditorSection.css';
import _ from 'lodash';
import { useState } from 'react';
import Button from './Button';
import mapEditFields from '../utils/mapEditFields';
import mapViewFields from '../utils/mapViewFields';
import { useDispatch, useSelector } from 'react-redux';
import { discardTempCV, saveTempCV } from '../slices/cvDataSlice';

function EditorSection({ children, title, path, isActive, onShow, onHide }) {
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();
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
                      'tempCVData',
                      cvData.selectedCVIndex,
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
                      'tempCVData',
                      cvData.selectedCVIndex,
                      ...path,
                    ]),
                    path: path,
                  })}
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
    </div>
  );
}

export default EditorSection;
