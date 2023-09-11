import '../styles/EditorSection.css';
import { useState } from 'react';
import Button from './Button';
import mapFieldsEdit from '../utils/mapFieldsEdit';
import mapFieldsView from '../utils/mapFieldsView';

function EditorSection({
  title,
  name,
  index,
  data,
  isActive,
  onShow,
  onHide,
  onDiscardSection,
  onSaveSection,
  onChange,
}) {
  const [mode, setMode] = useState('view');

  let content = <></>;
  switch (mode) {
    case 'view':
      content = (
        <div className="view-field-list">
          {mapFieldsView({
            data: data,
          })}
          <button onClick={() => setMode('edit')}>Edit</button>
        </div>
      );
      break;

    case 'edit':
      content = (
        <div className="edit-field-list">
          {mapFieldsEdit({
            data: data,
            sectionName: name,
            index: index,
            onChange: onChange,
          })}
          <Button
            type={'discard'}
            onClick={() => {
              onDiscardSection(name, index);
              setMode('view');
            }}
          />
          <Button
            type={'save'}
            onClick={() => {
              onSaveSection(name, index);
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
