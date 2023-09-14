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
                    data: data,
                  })}
                  <Button type={'edit'} onClick={() => setMode('edit')} />
                </>
              );

            case 'edit':
              return (
                <>
                  {children}
                  {mapEditFields({
                    data: data,
                    path: path,
                    updateField: updateField,
                    modifyList: modifyList,
                  })}
                  <div className="manage-section">
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
                </>
              );
          }
        })()}
      </div>
    </div>
  );
}

export default EditorSection;
