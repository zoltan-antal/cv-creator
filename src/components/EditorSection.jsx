import '../styles/EditorSection.css';
import { useState } from 'react';
import Button from './Button';
import { format } from 'date-fns';

function EditorSection({
  children,
  title,
  name,
  index,
  data,
  isActive,
  onShow,
  onHide,
  onDiscardSection,
  onSaveSection,
}) {
  const [mode, setMode] = useState('view');

  let content = <></>;
  switch (mode) {
    case 'view':
      content = (
        <div className="view-field-list">
          {Object.entries(data).map(([key, value]) => {
            if (typeof value === 'boolean') {
              return (
                <p key={key}>
                  {key.charAt(0).toUpperCase() + key.toLowerCase().slice(1)}:{' '}
                  {value ? 'yes' : 'no'}
                </p>
              );
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
              return <p key={key}>{format(value, 'MMM yyyy')}</p>;
            }
            return <p key={key}>{value}</p>;
          })}
          <button onClick={() => setMode('edit')}>Edit</button>
        </div>
      );
      break;

    case 'edit':
      content = (
        <div className="edit-field-list">
          {children}
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
