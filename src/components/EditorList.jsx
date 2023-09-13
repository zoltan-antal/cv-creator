import Button from './Button';
import '../styles/EditorList.css';

function EditorList({ title, path, data, onChange, modifyList }) {
  return (
    <label className="editor-list">
      {title}
      {data.map((value, index) => {
        return (
          <div className="list-item" key={index}>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange([...path, index], e.target.value)}
            ></input>
            <Button
              type={'remove'}
              onClick={() => {
                modifyList({
                  path: path,
                  mode: 'remove',
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
          modifyList({
            path: path,
            mode: 'add',
            blankDataElement: '',
            tempOnly: true,
          })
        }
      ></Button>
    </label>
  );
}

export default EditorList;
