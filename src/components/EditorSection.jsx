import '../styles/EditorSection.css';
import { useState } from 'react';
import Button from './Button';
import mapEditFields from '../utils/mapEditFields';
import mapViewFields from '../utils/mapViewFields';

function EditorSection({
  children,
  title,
  path,
  data,
  isActive,
  onShow,
  onHide,
  manageSection,
  updateField,
  modifyList,
}) {
  const [mode, setMode] = useState('edit');

  let content = <></>;
  switch (mode) {
    case 'view':
      content = (
        <div className="content">
          {mapViewFields({
            data: data,
          })}
          <button onClick={() => setMode('edit')}>Edit</button>
        </div>
      );
      break;

    case 'edit':
      content = (
        <div className="content">
          {children}
          {mapEditFields({
            data: data,
            path: path,
            updateField: updateField,
            modifyList: modifyList,
          })}
          <Button
            type={'discard'}
            onClick={() => {
              manageSection(path, 'discard');
              setMode('view');
            }}
          />
          <Button
            type={'save'}
            onClick={() => {
              manageSection(path, 'save');
              setMode('view');
            }}
          />
        </div>
      );
      break;
  }

  return (
    <div className="editor-section">
      <div className="header">
        <h2 className="title">{title}</h2>
        {(() => {
          if (isActive) {
            return (
              <>
                <Button name={'▲'} onClick={onHide} />
              </>
            );
          } else {
            return (
              <>
                <Button name={'▼'} onClick={onShow} />
              </>
            );
          }
        })()}
      </div>
      {(() => {
        if (isActive) {
          return <>{content}</>;
        }
      })()}
    </div>
  );
}

export default EditorSection;
