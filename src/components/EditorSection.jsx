import '../styles/EditorSection.css';
import { useState } from 'react';
import Button from './Button';
import mapEditFields from '../utils/mapEditFields';
import mapViewFields from '../utils/mapViewFields';

function EditorSection({
  title,
  path,
  data,
  isActive,
  onShow,
  onHide,
  manageSection,
  updateField,
}) {
  const [mode, setMode] = useState('view');

  let content = <></>;
  switch (mode) {
    case 'view':
      content = (
        <div className="view-field-list">
          {mapViewFields({
            data: data,
          })}
          <button onClick={() => setMode('edit')}>Edit</button>
        </div>
      );
      break;

    case 'edit':
      content = (
        <div className="edit-field-list">
          {mapEditFields({
            data: data,
            path: path,
            updateField: updateField,
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
      <h2>{title}</h2>
      {(() => {
        if (isActive) {
          return (
            <>
              <Button name={'▲'} onClick={onHide} />
              {content}
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
  );
}

export default EditorSection;
