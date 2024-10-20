"use client";

import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./Menubar";
import { useState } from "react";
import Document from "@tiptap/extension-document";
import useSWR from "swr";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
// define your extension array
const extensions = [
  Document,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
];

const Tiptap = () => {
  //   const { blogs } = useBlog();
  const { data: blogs, error } = useSWR("/api/blogs", fetcher, {
    refreshInterval: 2000,
  });
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState("");

  async function handleChange(blog) {
    const blogObj = {
      _id: blog._id,
      content: description,
    };
    if (!blogObj.content) return;
    const res = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(blogObj),
    }).then((res) => res.json());
    setDescription(res?.blog?.content);
  }

  return (
    <>
      <button
        className="bg-purple-600 p-5 "
        onClick={() => setEdit((prevState) => !prevState)}
      >
        {!edit ? "Edit" : "Save"}
      </button>
      <>
        {blogs?.data?.map((blog) => {
          return edit ? (
            <EditorProvider
              key={blog}
              onUpdate={(data) => setDescription(data.editor.getHTML())}
              onDestroy={() => {
                handleChange(blog);
              }}
              content={blog?.content}
              extensions={extensions}
              immediatelyRender={false}
              slotBefore={<MenuBar />}
            />
          ) : (
            <div
              key={blog}
              dangerouslySetInnerHTML={{
                // __html: !description ? blog?.content : description,
                __html: blog?.content,
              }}
            ></div>
          );
        })}
      </>
    </>
  );
};

export default Tiptap;
