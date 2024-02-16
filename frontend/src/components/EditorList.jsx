import { useEffect } from 'react';
import '../styles/EditorList.css';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {
  addListElementToTempCV,
  removeListElementFromTempCV,
  updateTempCV,
} from '../slices/cvDataSlice';

function EditorList({ title, type, path, data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const textareas = document.querySelectorAll('.editor-list textarea');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });

  return (
    <label className="editor-list">
      {title}
      {data.map((value, index) => {
        return (
          <div className="list-item" key={index}>
            {(() => {
              switch (type) {
                case 'text':
                  return (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        dispatch(
                          updateTempCV({
                            value: e.target.value,
                            path: [...path, index],
                          })
                        )
                      }
                    ></input>
                  );

                case 'textarea':
                  return (
                    <textarea
                      rows={1}
                      value={value}
                      onChange={(e) =>
                        dispatch(
                          updateTempCV({
                            value: e.target.value,
                            path: [...path, index],
                          })
                        )
                      }
                    ></textarea>
                  );
              }
            })()}
            <Button
              type={'remove'}
              onClick={() =>
                dispatch(removeListElementFromTempCV({ index, path }))
              }
            ></Button>
          </div>
        );
      })}
      <Button
        type={'add'}
        onClick={() =>
          dispatch(addListElementToTempCV({ blankDataElement: '', path }))
        }
      ></Button>
    </label>
  );
}

export default EditorList;
