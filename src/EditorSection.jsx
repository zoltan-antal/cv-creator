function EditorSection({ children, title }) {
  return (
    <div className="editor-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default EditorSection;
