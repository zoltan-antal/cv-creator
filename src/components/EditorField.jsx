function EditorField({ title, name, type, onChange }) {
  return (
    <label>
      {title}
      <input
        type={type}
        name={name}
        onChange={(e) => onChange(name, e.target.value)}
      ></input>
    </label>
  );
}

export default EditorField;
