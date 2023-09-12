import { useState } from 'react';
import EditorSection from './EditorSection';
import Button from './Button';

function EditorList({
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
                        element.school || element.title
                          ? element.school || element.title
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
                    ></EditorSection>
                    <Button
                      name={'╳'}
                      onClick={() =>
                        modifyList({ path: path, mode: 'remove', index: index })
                      }
                    />
                  </div>
                );
              })}
              <Button
                name={'+'}
                onClick={() =>
                  modifyList({
                    path: path,
                    mode: 'add',
                    blankDataElement: blankDataElement,
                  })
                }
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

export default EditorList;
