"use client";
import "./styles.css";
import { useCurrentEditor } from "@tiptap/react";
import useEditorMenu from "./useEditorMenu";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const { buttons } = useEditorMenu();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        {buttons.map((button) => (
          <button
            {...button}
            key={button.key}
            className="bg-purple-500 p-2  rounded-lg "
          >
            {button.key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
