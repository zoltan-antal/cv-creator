import '../styles/EditorList.css';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';

function EditorList({ title, path, data }) {
  const dispatch = useCvDataDispatch();

  return (
    <label className="editor-list">
      {title}
      {data.map((value, index) => {
        return (
          <div className="list-item" key={index}>
            <input
              type="text"
              value={value}
              onChange={(e) =>
                dispatch({
                  type: 'update',
                  path: [...path, index],
                  value: e.target.value,
                })
              }
            ></input>
            <Button
              type={'remove'}
              onClick={() => {
                dispatch({
                  type: 'removeListElement',
                  path: path,
                  index: index,
                  tempOnly: true,
                });
              }}
            ></Button>
          </div>
        );
      })}
      <Button
        type={'add'}
        onClick={() =>
          dispatch({
            type: 'addListElement',
            path: path,
            blankDataElement: '',
            tempOnly: true,
          })
        }
      ></Button>
    </label>
  );
}

export default EditorList;
