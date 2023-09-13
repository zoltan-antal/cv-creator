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
    <>
      <h2>{title}</h2>
      {(() => {
        if (isActive) {
          return (
            <>
              <Button name={'▲'} onClick={onHide} />
              {data.map((element, index) => {
                return (
                  <div key={element.id}>
                    <EditorSection
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
                    ></EditorSection>
                    <Button
                      type={'remove'}
                      onClick={() =>
                        modifyList({ path: path, mode: 'remove', index: index })
                      }
                    />
                  </div>
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
    </>
  );
}

export default EditorSectionList;
