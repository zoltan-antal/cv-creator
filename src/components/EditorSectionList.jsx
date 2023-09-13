import { useState } from 'react';
import EditorSection from './EditorSection';
import Button from './Button';

function EditorSectionList({
  title,
  elementName,
  path,
  data,
  isActive,
  onShow,
  onHide,
  manageSection,
  updateField,
  blankDataElement,
  modifyList,
}) {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  return (
    <div className="editor-section-list">
      <div className="header">
        <h2 className="title">{title}</h2>
        {(() => {
          if (isActive) {
            return <Button name={'▲'} onClick={onHide} />;
          } else {
            return <Button name={'▼'} onClick={onShow} />;
          }
        })()}
      </div>
      {(() => {
        if (isActive) {
          return (
            <div className="content">
              {data.map((element, index) => {
                return (
                  <EditorSection
                    key={element.id}
                    title={
                      Object.values(element)[1]
                        ? Object.values(element)[1]
                        : `Unnamed ${elementName}`
                    }
                    index={index}
                    path={[...path, index]}
                    data={element}
                    isActive={activeEditorSection === element.id}
                    onShow={() => setActiveEditorSection(element.id)}
                    onHide={() => setActiveEditorSection(false)}
                    manageSection={manageSection}
                    updateField={updateField}
                    modifyList={modifyList}
                  >
                    <Button
                      type={'delete'}
                      onClick={() =>
                        modifyList({
                          path: path,
                          mode: 'remove',
                          index: index,
                        })
                      }
                    />
                  </EditorSection>
                );
              })}
              <Button
                type={'add'}
                onClick={() => {
                  const id = self.crypto.randomUUID();
                  modifyList({
                    path: path,
                    mode: 'add',
                    blankDataElement: blankDataElement,
                    id: id,
                  });
                  setActiveEditorSection(id);
                }}
              />
            </div>
          );
        }
      })()}
    </div>
  );
}

export default EditorSectionList;
