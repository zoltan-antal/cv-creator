import { useState } from 'react';
import Button from './Button';

function EditorSection({
  children,
  title,
  name,
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
        <>
          {Object.entries(data).map(([key, value]) => {
            if (!value) {
              return null;
            }
            if (Array.isArray(value)) {
              return null;
            }
            return <p key={key}>{value}</p>;
          })}
          <button onClick={() => setMode('edit')}>Edit</button>
        </>
      );
      break;

    case 'edit':
      content = (
        <>
          {children}
          <Button
            type={'discard'}
            onClick={() => {
              onDiscardSection(name);
              setMode('view');
            }}
          />
          <Button
            type={'save'}
            onClick={() => {
              onSaveSection(name);
              setMode('view');
            }}
          />
        </>
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
