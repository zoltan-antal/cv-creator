import _ from 'lodash';
import { useState } from 'react';
// import { useCvData, useCvDataDispatch } from '../contexts/CvDataContext';
import { useSession } from '../contexts/SessionContext';
import EditorSection from './EditorSection';
import Button from './Button';
import cvService from '../services/cv';
import { useDispatch, useSelector } from 'react-redux';
import {
  addListElementToTempCV,
  removeListElementFromTempCV,
  saveTempCV,
} from '../slices/cvDataSlice';

function EditorSectionList({
  title,
  elementName,
  path,
  isActive,
  onShow,
  onHide,
  blankDataElement,
}) {
  // const cvData = useCvData();
  // const dispatchCvData = useCvDataDispatch();
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();
  const session = useSession();
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  return (
    <div className="editor-section-list">
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
        {_.get(cvData, [
          'cvLists',
          'tempCvData',
          cvData.selectedCvIndex,
          ...path,
        ]).map((element, index) => {
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
              isActive={activeEditorSection === element.id}
              onShow={() => setActiveEditorSection(element.id)}
              onHide={() => setActiveEditorSection(false)}
            >
              <Button
                type={'delete'}
                className={'dark'}
                name={`Delete ${elementName}`}
                onClick={async () => {
                  // dispatchCvData({
                  //   type: 'removeListElement',
                  //   path: path,
                  //   index: index,
                  //   save: true,
                  // });
                  dispatch(removeListElementFromTempCV({ index, path }));
                  dispatch(saveTempCV());
                  if (session) {
                    await cvService.updateCV(
                      cvData.selectedCvIndex,
                      cvData.cvLists.tempCvData[cvData.selectedCvId]
                    );
                  }
                }}
              />
            </EditorSection>
          );
        })}
        <Button
          type={'add'}
          onClick={() => {
            const id = self.crypto.randomUUID();
            const newDataElement = { ...blankDataElement };
            newDataElement.id = id;
            // dispatchCvData({
            //   type: 'addListElement',
            //   path: path,
            //   blankDataElement: newDataElement,
            //   save: true,
            // });
            dispatch(
              addListElementToTempCV({ blankDataElement: newDataElement, path })
            );
            dispatch(saveTempCV());
            setActiveEditorSection(id);
          }}
        />
      </div>
    </div>
  );
}

export default EditorSectionList;
