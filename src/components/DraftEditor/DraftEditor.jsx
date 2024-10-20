"use client";
import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";

function DraftEditor() {
  const [editor, setEditor] = useState(() => EditorState.createEmpty());

  return (
    <div>
      <h1>hello editor</h1>
      <Editor editorState={editor} onChange={setEditor} />
    </div>
  );
}

export default DraftEditor;
