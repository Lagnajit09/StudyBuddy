import "./Tiptap.scss";
import { EditorContent, EditorProvider, useEditor } from "@tiptap/react";
import React, { useState } from "react";
import MenuBar from "./MenuBar/MenuBar";
import { extensions } from "./extensions";

// Define custom command to split blocks while preserving marks and attributes
const splitBlockPreserveStyles = ({ state, dispatch }) => {
  const { from, to, node } = state.selection;

  // Check if selection is at the end of a paragraph
  if (from === to && node && node.type.name === "paragraph") {
    // Split the paragraph and preserve marks and attributes
    dispatch(state.tr.split(from, 1, [{ type: "paragraph" }]));
    return true;
  }

  return false;
};

const TipTap = () => {
  const [selectedSize, setSelectedSize] = useState("Normal");
  const [content, setContent] = useState(``);
  const editor = useEditor({
    extensions,
    content: `<p></p>`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter") {
          const { state, dispatch } = view;
          if (splitBlockPreserveStyles({ state, dispatch })) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
    },
  });

  return (
    <div className="tiptap-container">
      <EditorProvider extensions={extensions}>
        <MenuBar
          selected_Size={selectedSize}
          setSelected_Size={setSelectedSize}
          editor={editor}
          content={content}
        />
        <EditorContent editor={editor} />
      </EditorProvider>

      <div className="noteCreation-err"></div>
    </div>
  );
};

export default TipTap;
