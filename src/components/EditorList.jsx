import Button from './Button';

function EditorList({ title, path, data, onChange, modifyList }) {
  return (
    <div>
      {title}
      {data.map((value, index) => {
        return (
          <div key={index}>
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
    </div>
  );
}

export default EditorList;
