import "./MenuBar.css";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authUserAtom } from "../../../../store/authAtom";
import { useRecoilValue } from "recoil";
import { GoBold } from "react-icons/go";
import { PiTextItalicBold } from "react-icons/pi";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { PiTextStrikethroughBold } from "react-icons/pi";
import { AiOutlineFontColors } from "react-icons/ai";
import { GoListOrdered } from "react-icons/go";
import { GoListUnordered } from "react-icons/go";
import { PiTextAlignLeft } from "react-icons/pi";
import { PiTextAlignRight } from "react-icons/pi";
import { PiTextAlignJustify } from "react-icons/pi";
import { PiTextAlignCenter } from "react-icons/pi";
import { PiLinkSimple } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { PiArchiveLight } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHighlighter } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { saveNote } from "../saveNote";

const MenuBar = ({ setSelected_Size, editor, content, contentText }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const authUser = useRecoilValue(authUserAtom);

  const [textLink, setTextLink] = useState(true);
  const [textAlign, setTextAlign] = useState(<PiTextAlignLeft />);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
  const [showFontColorMenu, setShowFontColorMenu] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Normal");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [highlightColor, setHighlightColor] = useState("#000000");
  const [fontColor, setfontColor] = useState("#000000");
  const [openMoreOpt, setOpenMoreOpt] = useState(false);
  const [title, setTitle] = useState(state?.title || "");
  const buttonMenuWrapper = useRef(null);

  if (!editor) {
    return null;
  }

  useEffect(() => {
    const closeMenu = (event) => {
      if (
        buttonMenuWrapper.current &&
        !buttonMenuWrapper.current.contains(event.target)
      ) {
        setShowAlignMenu(false);
        setOpenMoreOpt(false);
        setShowHighlightMenu(false);
        setShowFontColorMenu(false);
        setShowFontMenu(false);
        setShowFontSizeMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [buttonMenuWrapper]);

  const setLink = useCallback(() => {
    setTextLink(false);
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        editor.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    },
    [editor]
  );

  const handleFontSizeButtonClick = () => {
    setShowFontSizeMenu(!showFontSizeMenu);
  };

  const handleFontSizeSelection = (size) => {
    setSelected_Size(size);
    setShowFontSizeMenu(false);
    switch (size) {
      case "Small":
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case "Normal":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "Large":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "Huge":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="tiptap-toolbar">
        <div className="toolbar-left">
          <button
            onClick={() => {
              navigate(`/note`);
            }}
          >
            <FaArrowLeftLong style={{ cursor: "pointer" }} />
          </button>
          <input
            type="text"
            placeholder="Note Name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="toolbar-middle">
          <div className="toolbar-div1">
            <button
              onClick={handleFontSizeButtonClick}
              className={showFontSizeMenu ? "active" : ""}
            >
              {selectedSize} <IoIosArrowDown />
            </button>
            {showFontSizeMenu && (
              <div className="size-menu">
                <button
                  onClick={() => handleFontSizeSelection("Small")}
                  className={selectedSize === "Small" ? "active" : ""}
                >
                  Small
                </button>
                <button
                  onClick={() => handleFontSizeSelection("Normal")}
                  className={selectedSize === "Normal" ? "active" : ""}
                >
                  Normal
                </button>
                <button
                  onClick={() => handleFontSizeSelection("Large")}
                  className={selectedSize === "Large" ? "active" : ""}
                >
                  Large
                </button>
                <button
                  onClick={() => handleFontSizeSelection("Huge")}
                  className={selectedSize === "Huge" ? "active" : ""}
                >
                  Huge
                </button>
              </div>
            )}
            <button
              onClick={() => {
                editor.chain().focus().setFontFamily("").run();
                setShowFontMenu(!showFontMenu);
              }}
              id="fontBtn"
              className={
                editor.isActive("textStyle", { fontFamily: "" })
                  ? "is-active"
                  : ""
              }
            >
              {selectedFont} <IoIosArrowDown />
            </button>
            {showFontMenu && (
              <div className="font-menu" ref={buttonMenuWrapper}>
                <button
                  onClick={() => {
                    editor.chain().focus().setFontFamily("").run();
                    setShowFontMenu(!showFontMenu);
                    setSelectedFont("Montserrat");
                  }}
                  className={
                    editor.isActive("textStyle", { fontFamily: "" })
                      ? "is-active"
                      : ""
                  }
                >
                  Montserrat
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setFontFamily("Inter").run();
                    setShowFontMenu(!showFontMenu);
                    setSelectedFont("Inter");
                  }}
                  className={
                    editor.isActive("textStyle", { fontFamily: "Inter" })
                      ? "is-active"
                      : ""
                  }
                >
                  Inter
                </button>
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .setFontFamily("Comic Sans MS, Comic Sans")
                      .run();
                    setShowFontMenu(!showFontMenu);
                    setSelectedFont("Comic Sans");
                  }}
                  className={
                    editor.isActive("textStyle", {
                      fontFamily: "Comic Sans MS, Comic Sans",
                    })
                      ? "is-active"
                      : ""
                  }
                >
                  Comic Sans
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setFontFamily("serif").run();
                    setShowFontMenu(!showFontMenu);
                    setSelectedFont("Serif");
                  }}
                  className={
                    editor.isActive("textStyle", { fontFamily: "serif" })
                      ? "is-active"
                      : ""
                  }
                >
                  serif
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setFontFamily("monospace").run();
                    setShowFontMenu(!showFontMenu);
                    setSelectedFont("Monospace");
                  }}
                  className={
                    editor.isActive("textStyle", { fontFamily: "monospace" })
                      ? "is-active"
                      : ""
                  }
                >
                  monospace
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setFontFamily("cursive").run();
                    setShowFontMenu(!showFontMenu);
                    setSelectedFont("Cursive");
                  }}
                  className={
                    editor.isActive("textStyle", { fontFamily: "cursive" })
                      ? "is-active"
                      : ""
                  }
                >
                  cursive
                </button>
              </div>
            )}
          </div>

          <div className="toolbar-div2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <GoBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <PiTextItalicBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
            >
              <MdOutlineFormatUnderlined />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <PiTextStrikethroughBold />
            </button>
            <button
              style={{ color: fontColor }}
              onClick={() => {
                editor.chain().focus().setColor("#000000").run();
                setShowFontColorMenu(!showFontColorMenu);
                setfontColor("#000000");
              }}
              className={
                editor.isActive("textStyle", { color: "#000000" })
                  ? "is-active"
                  : ""
              }
            >
              <AiOutlineFontColors />
            </button>
            {showFontColorMenu && (
              <div className="fontcolor-menu" ref={buttonMenuWrapper}>
                <button
                  onClick={() => {
                    editor.chain().focus().setColor("#FBBC88").run();
                    setShowFontColorMenu(false);
                    setfontColor("#FBBC88");
                  }}
                  className={
                    editor.isActive("textStyle", { color: "#FBBC88" })
                      ? "is-active"
                      : ""
                  }
                  data-testid="setPurple"
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#FBBC88" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setColor("#FF0000").run();
                    setShowFontColorMenu(false);
                    setfontColor("#FF0000");
                  }}
                  className={
                    editor.isActive("textStyle", { color: "#FF0000" })
                      ? "is-active"
                      : ""
                  }
                  data-testid="setRed"
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "red" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setColor("#9900FF").run();
                    setShowFontColorMenu(false);
                    setfontColor("#9900FF");
                  }}
                  className={
                    editor.isActive("textStyle", { color: "#9900FF" })
                      ? "is-active"
                      : ""
                  }
                  data-testid="setYellow"
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#9900FF" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setColor("#025BFF").run();
                    setShowFontColorMenu(false);
                    setfontColor("#025BFF");
                  }}
                  className={
                    editor.isActive("textStyle", { color: "#025BFF" })
                      ? "is-active"
                      : ""
                  }
                  data-testid="setTeal"
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#025BFF" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setColor("#000000").run();
                    setShowFontColorMenu(false);
                    setfontColor("#000000");
                  }}
                  className={
                    editor.isActive("textStyle", { color: "#000000" })
                      ? "is-active"
                      : ""
                  }
                  data-testid="setGreen"
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#000000" }}
                  ></div>
                </button>
              </div>
            )}

            <button
              style={{ color: highlightColor }}
              onClick={() => {
                editor.chain().focus().toggleHighlight().run();
                setHighlightColor("#000000");
                setShowHighlightMenu(!showHighlightMenu);
              }}
              className={editor.isActive("highlight") ? "is-active" : ""}
            >
              <LuHighlighter />
            </button>
            {showHighlightMenu && (
              <div className="highlight-menu" ref={buttonMenuWrapper}>
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#ffc078" })
                      .run();
                    setHighlightColor("#ffc078");
                    setShowHighlightMenu(false);
                  }}
                  className={
                    editor.isActive("highlight", { color: "#ffc078" })
                      ? "is-active"
                      : ""
                  }
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#ffc078" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#8ce99a" })
                      .run();
                    setHighlightColor("#8ce99a");
                    setShowHighlightMenu(false);
                  }}
                  className={
                    editor.isActive("highlight", { color: "#8ce99a" })
                      ? "is-active"
                      : ""
                  }
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#8ce99a" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#74c0fc" })
                      .run();
                    setHighlightColor("#74c0fc");
                    setShowHighlightMenu(false);
                  }}
                  className={
                    editor.isActive("highlight", { color: "#74c0fc" })
                      ? "is-active"
                      : ""
                  }
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#74c0fc" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#b097fc8a" })
                      .run();
                    setHighlightColor("#b097fc8a");
                    setShowHighlightMenu(false);
                  }}
                  className={
                    editor.isActive("highlight", { color: "#b097fc8a" })
                      ? "is-active"
                      : ""
                  }
                >
                  <div
                    className="color"
                    style={{ backgroundColor: "#b097fc8a" }}
                  ></div>
                </button>
                <button
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHighlight({ color: "#ffffff" })
                      .run();
                    setHighlightColor("#000000");
                    setShowHighlightMenu(false);
                  }}
                  className={
                    editor.isActive("highlight", { color: "#ffffff" })
                      ? "is-active"
                      : ""
                  }
                >
                  <div
                    className="color"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid lightgray",
                    }}
                  ></div>
                </button>
              </div>
            )}
          </div>

          <div className="toolbar-div3">
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <GoListOrdered />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <GoListUnordered />
            </button>

            <button
              className="text-align-btn"
              onClick={() => setShowAlignMenu(!showAlignMenu)}
            >
              {textAlign}
            </button>
            {showAlignMenu && (
              <div className="text-align-opt" ref={buttonMenuWrapper}>
                <button
                  onClick={() => {
                    editor.chain().focus().setTextAlign("left").run();
                    setTextAlign(<PiTextAlignLeft />);
                    setShowAlignMenu(false);
                  }}
                  className={
                    editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                  }
                >
                  <PiTextAlignLeft />
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setTextAlign("center").run();
                    setTextAlign(<PiTextAlignCenter />);
                    setShowAlignMenu(false);
                  }}
                  className={
                    editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                  }
                >
                  <PiTextAlignCenter />
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setTextAlign("right").run();
                    setTextAlign(<PiTextAlignRight />);
                    setShowAlignMenu(false);
                  }}
                  className={
                    editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                  }
                >
                  <PiTextAlignRight />
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().setTextAlign("justify").run();
                    setTextAlign(<PiTextAlignJustify />);
                    setShowAlignMenu(false);
                  }}
                  className={
                    editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                  }
                >
                  <PiTextAlignJustify />
                </button>
              </div>
            )}
          </div>

          <div className="toolbar-div4">
            {textLink && (
              <button
                onClick={setLink}
                className={editor.isActive("link") ? "is-active" : ""}
              >
                <PiLinkSimple />
              </button>
            )}
            {!textLink && (
              <button
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  setTextLink(true);
                }}
                disabled={!editor.isActive("link")}
              >
                <PiLinkSimple />
              </button>
            )}
            <div className="select-image">
              <label htmlFor="image-picker">
                <IoImageOutline />
              </label>
              <input
                id="image-picker"
                type="file"
                accept="image/*"
                onChange={addImage}
              />
            </div>
          </div>
          <div className="toolbar-div5">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              <LuHeading1 />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              <LuHeading2 />
            </button>
          </div>

          <div className="toolbar-div6">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <BiUndo />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <BiRedo />
            </button>
          </div>
        </div>
        <div className="toolbar-right">
          <PiArchiveLight style={{ cursor: "pointer" }} />
          <IoMdMore
            style={{ cursor: "pointer" }}
            onClick={() => setOpenMoreOpt(!openMoreOpt)}
          />
          {openMoreOpt && (
            <div className="toolbar-more-menu" ref={buttonMenuWrapper}>
              <h6
                onClick={() => {
                  saveNote(title, content, contentText, authUser.userId);
                  setOpenMoreOpt(false);
                }}
              >
                Save
              </h6>
              <h6
                onClick={() => {
                  setOpenMoreOpt(false);
                }}
              >
                Add to Folder
              </h6>
              <h6
                onClick={() => {
                  setOpenMoreOpt(false);
                }}
              >
                Add to Topic
              </h6>
              <h6
                onClick={() => {
                  setOpenMoreOpt(false);
                }}
              >
                Download
              </h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuBar;
