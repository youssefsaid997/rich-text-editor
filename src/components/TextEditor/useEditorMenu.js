import { useCurrentEditor } from "@tiptap/react";
import "./styles.css";

function useEditorMenu() {
  const { editor } = useCurrentEditor();
  const buttons = [
    {
      key: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      className: editor.isActive("bold") ? "is-active" : "",
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      key: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      className: editor.isActive("italic") ? "is-active" : "",
    },
    {
      key: "Strike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      className: editor.isActive("strike") ? "is-active" : "",
    },
  ];

  return { buttons };
}

export default useEditorMenu;
