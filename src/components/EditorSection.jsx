import '../styles/EditorSection.css';
import { useState } from 'react';
import Button from './Button';
import { format } from 'date-fns';
import parseCamelCaseString from '../utils/parseCamelCaseString';
import mapEditorFields from '../utils/mapEditorFields';

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

  const ongoingIndex = Object.keys(data).indexOf('ongoing');
  const ongoing = ongoingIndex ? Object.values(data)[ongoingIndex] : false;

  let content = <></>;
  switch (mode) {
    case 'view':
      content = (
        <div className="view-field-list">
          {Object.entries(data).map(([key, value]) => {
            const label = parseCamelCaseString(key) + ':';
            let content;

            if (typeof value === 'boolean') {
              content = value ? 'yes' : 'no';
            }
            if (!value) {
              return null;
            }
            if (key === 'id') {
              return null;
            }
            if (Array.isArray(value)) {
              return null;
            }
            if (typeof value === 'object' && value instanceof Date) {
              if (Date.parse(value) === 0) {
                return null;
              }
              if (ongoing && key === 'endDate') {
                return null;
              }
              content = format(value, 'MMM yyyy');
            }
            if (typeof value === 'string') {
              content = value;
            }
            return (
              <div key={key}>
                <p>{label}</p>
                <p>{content}</p>
              </div>
            );
          })}
          <button onClick={() => setMode('edit')}>Edit</button>
        </div>
      );
      break;

    case 'edit':
      content = (
        <div className="edit-field-list">
          {mapEditorFields({
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
