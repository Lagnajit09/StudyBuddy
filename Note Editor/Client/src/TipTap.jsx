// import "./Tiptap.scss";
// import { Color } from "@tiptap/extension-color";
// import Heading from "@tiptap/extension-heading";
// import FontFamily from "@tiptap/extension-font-family";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import Underline from "@tiptap/extension-underline";
// import Highlight from "@tiptap/extension-highlight";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import TextAlign from "@tiptap/extension-text-align";
// import Bold from "@tiptap/extension-bold";
// import { EditorProvider } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React from "react";
// import MenuBar from "./MenuBar/MenuBar";

// const extensions = [
//   Heading.configure({
//     HTMLAttributes: {
//       class: "size-text",
//     },
//     levels: [1, 2, 3, 4, 5],
//   }),
//   FontFamily.configure({
//     types: ["textStyle"],
//   }),
//   Bold.configure({
//     HTMLAttributes: {
//       class: "bold-text",
//     },
//   }),
//   Color.configure({ types: [TextStyle.name, ListItem.name] }),
//   TextStyle.configure({ types: [ListItem.name] }),
//   Underline.configure({
//     HTMLAttributes: {
//       class: "underline-text",
//     },
//   }),
//   Highlight.configure({
//     HTMLAttributes: {
//       class: "highlight-text",
//     },
//     multicolor: true,
//   }),
//   Link.configure({
//     protocols: ["ftp", "mailto"],
//     autolink: true,
//     openOnClick: true,
//     linkOnPaste: true,
//     HTMLAttributes: {
//       class: "link-text",
//     },
//   }),
//   Image.configure({
//     inline: true,
//     allowBase64: true,
//   }),
//   TextAlign.configure({
//     types: ["heading", "paragraph"],
//   }),
//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false,
//     },
//   }),
// ];

// const content = ``;

// export default () => {
//   return (
//     <div className="tiptap-container">
//       <EditorProvider
//         slotBefore={<MenuBar />}
//         extensions={extensions}
//         content={content}
//       ></EditorProvider>
//     </div>
//   );
// };

import "./Tiptap.scss";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Bold from "@tiptap/extension-bold";
import { EditorContent, EditorProvider, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import MenuBar from "./MenuBar/MenuBar";

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

const extensions = [
  Heading.configure({
    HTMLAttributes: {
      class: "size-text",
    },
    levels: [1, 2, 3, 4, 5],
  }),
  FontFamily.configure({
    types: ["textStyle"],
  }),
  Bold.configure({
    HTMLAttributes: {
      class: "bold-text",
    },
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Underline.configure({
    HTMLAttributes: {
      class: "underline-text",
    },
  }),
  Highlight.configure({
    HTMLAttributes: {
      class: "highlight-text",
    },
    multicolor: true,
  }),
  Link.configure({
    protocols: ["ftp", "mailto"],
    autolink: true,
    openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: "link-text",
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = ``;

export default () => {
  const [selectedSize, setSelectedSize] = useState("Normal");

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      handleKeyDown(view, event) {
        // Handle Enter key press to preserve marks and attributes
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

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-container">
      <EditorProvider
        slotBefore={
          <MenuBar
            selected_Size={selectedSize}
            setSelected_Size={setSelectedSize}
          />
        }
        extensions={extensions}
        content={content}
        editor={editor}
      ></EditorProvider>
    </div>
  );
};
