import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import "./SettingsMiddle.css";
import Avatar from "@mui/material/Avatar";
import {
  emailHandler,
  passwordHandler,
  confirmPasswordHandler,
  newPasswordHandler,
  phNoHandler,
  nameHandler,
  getCurrentDate,
  defDateHandler,
} from "../../../helperfunction";
import { RiEdit2Line } from "react-icons/ri";
import {
  openCalendarAtom,
  openAddEvent,
  openCalendarEvent,
  defDate,
  defSTime,
  defETime,
} from "../../../../store/profileStore/profileStore";
import ProfileRight from "../../../components/ProfileRight/ProfileRight";
import clock from "../../../../assets/Profile-Icons/ProfileMiddleIcon/ClockIcon.svg";
import bookIcon from "../../../../assets/Profile-Icons/ProfileMiddleIcon/BookIcon.svg";
import bellIcon from "../../../../assets/Profile-Icons/ProfileMiddleIcon/BellIcon.svg";
import Move from "../Move";
import { authUserAtom } from "../../../../store/authAtom";
import { updateUser } from "./updateUser";
import { deleteAccountHandler } from "../../../../userAuthHandlers/authHandler";
import { useNavigate } from "react-router-dom";

const colours = [
  "#00A9FF",
  "#B3ABFC",
  "#FCBF49",
  "#79B2D9",
  "#39B8D4",
  "#E78895",
  "#63B4B8",
];

const SettingsMiddle = () => {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useRecoilState(authUserAtom);
  const [clicked, setClicked] = useRecoilState(openCalendarAtom);
  const [openRight, setOpenRight] = useRecoilState(openCalendarEvent);
  const [showForm, setShowForm] = useRecoilState(openAddEvent);
  const [inputStartTime, setInputStartTime] = useRecoilState(defSTime);
  const [inputEndTime, setInputEndTime] = useRecoilState(defETime);
  const [showDel, setShowDel] = useState(false);
  const [showUpdatePop, setUpdatePop] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPhoneNo, setEnteredPhoneNo] = useState("");
  const [enteredBio, setEnteredBio] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [enteredDltPassword, setEnteredDltPassword] = useState("");
  const [enteredNewPassword, setEnteredNewPassword] = useState("");
  const [enteredUserName, setEnteredUserName] = useState("");
  const [editPop, setEditPop] = useState(false);
  const [currColor, setCurrColor] = useState("");

  const [readyToUpdate, setReadyToUpdate] = useState(false);

  const user = useMemo(() => {
    return authUser.user;
  }, [authUser]);

  const username = useMemo(
    () => (user?.username !== user?.email ? user?.username : user?.firstname),
    [authUser]
  );

  useEffect(() => {
    if (authUser.user) {
      setEnteredEmail(user.email);
      setEnteredUserName(
        user?.username !== user?.email ? user?.username : user?.firstname
      );
      setEnteredBio(user.bio);
      setEnteredPhoneNo(user.phone);
      setCurrColor(user.profile_pic);
      setEnteredPhoneNo(user.phone);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser.user) {
      if (
        enteredUserName !== username ||
        enteredEmail !== user.email ||
        enteredBio !== user.bio ||
        enteredPhoneNo !== user.phone ||
        currColor !== user.profile_pic ||
        (enteredCurrentPassword.length !== 0 &&
          enteredNewPassword.length !== 0 &&
          enteredNewPassword === enteredConfirmPassword)
      ) {
        setReadyToUpdate(true);
      } else {
        setReadyToUpdate(false);
      }
    }
  }, [
    authUser,
    user,
    currColor,
    enteredUserName,
    enteredEmail,
    enteredBio,
    enteredPhoneNo,
    enteredCurrentPassword,
    enteredNewPassword,
    enteredConfirmPassword,
  ]);

  const updatedInfo = useMemo(() => {
    if (readyToUpdate && authUser.user) {
      return {
        userId: authUser?.userId,
        username: enteredUserName,
        email: enteredEmail,
        bio: enteredBio,
        phone: enteredPhoneNo,
        profile_pic: currColor,
        password: enteredNewPassword,
        currPassword: enteredCurrentPassword,
      };
    }
  }, [
    authUser,
    enteredUserName,
    enteredEmail,
    enteredBio,
    enteredPhoneNo,
    currColor,
    enteredNewPassword,
    enteredCurrentPassword,
    readyToUpdate,
  ]);

  // const handlePop = () => {
  //   setUpdatePop(true);
  //   setTimeout(() => {
  //     setUpdatePop(false);
  //   }, 5000);
  // };

  const colorHandler = (index) => {
    setCurrColor(colours[index]);
  };

  const checkCharacterLimit = () => {
    // Get the textarea element
    var textarea = event.target;

    // If the length of the text exceeds 100 characters
    if (textarea.value.length > 150) {
      // Truncate the text to 100 characters
      textarea.value = textarea.value.slice(0, 150);
      // Optionally prevent default event (not necessary since we're slicing the value)
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="settingsmiddle">
        <div className="settingsMiddle-container">
          {showDel && (
            <div className="right-container-del">
              <div
                className="del-overlay"
                onClick={() => {
                  setShowDel(!showDel);
                }}
              ></div>
              <div
                className="del-container"
                style={{ left: clicked ? "21%" : "35%" }}
              >
                <div className="del-content">
                  <span className="dc-span">Are you sure?</span>
                  <input
                    className="dc-input"
                    type="password"
                    value={enteredDltPassword}
                    placeholder="Enter Password"
                    onBlur={() => {
                      passwordHandler(
                        enteredDltPassword,
                        "dc-input",
                        "dc-invalid",
                        "input-error"
                      );
                    }}
                    onChange={(e) => {
                      setEnteredDltPassword(e.target.value);
                    }}
                  />
                  <span className="dc-invalid">Incorrect password!</span>
                  <span className="dc-btns">
                    <button
                      className="del-btn"
                      style={{ backgroundColor: "rgba(186, 186, 186, 1)" }}
                      onClick={() => {
                        setShowDel(!showDel);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="del-btn"
                      style={{ backgroundColor: "rgba(255, 95, 95, 1)" }}
                      onClick={() => {
                        deleteAccountHandler(
                          setAuthUser,
                          navigate,
                          authUser.user.email,
                          enteredDltPassword
                        );
                      }}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>
          )}

          {showUpdatePop && <Move move={showUpdatePop} />}
          <div className="left-container">
            <span className="accInfo-span">Account Info</span>
            <Avatar
              src={authUser?.user?.profile_pic}
              alt={authUser?.user?.firstname.toUpperCase()}
              className="avatar-com"
              sx={{
                bgcolor: currColor,
                width: "120px",
                height: "120px",
                fontSize: "65px",
                marginBottom: "7%",
                cursor: "pointer",
                position: "static",
              }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                onClick={() => {
                  setEditPop(!editPop);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: editPop ? "#00A9FF" : "#000000",
                }}
              >
                Edit
                <RiEdit2Line
                  style={{
                    marginLeft: "2%",
                    cursor: "pointer",
                    color: editPop ? "#00A9FF" : "#000000",
                    height: "100%",
                  }}
                  onClick={() => {
                    setEditPop(!editPop);
                  }}
                />
              </span>
            </div>
            {editPop && (
              <>
                <div className="editpop">
                  <div
                    className="editcl1"
                    style={{
                      backgroundColor: colours[0],
                      border:
                        currColor == colours[0]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(0);
                      setEditPop(!editPop);
                    }}
                  ></div>
                  <div
                    className="editcl2"
                    style={{
                      backgroundColor: colours[1],
                      border:
                        currColor == colours[1]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(1);
                      setEditPop(!editPop);
                    }}
                  ></div>
                  <div
                    className="editcl3"
                    style={{
                      backgroundColor: colours[2],
                      border:
                        currColor == colours[2]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(2);
                      setEditPop(!editPop);
                    }}
                  ></div>
                  <div
                    className="editcl4"
                    style={{
                      backgroundColor: colours[3],
                      border:
                        currColor == colours[3]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(3);
                      setEditPop(!editPop);
                    }}
                  ></div>
                  <div
                    className="editcl5"
                    style={{
                      backgroundColor: colours[4],
                      border:
                        currColor == colours[4]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(4);
                      setEditPop(!editPop);
                    }}
                  ></div>
                  <div
                    className="editcl6"
                    style={{
                      backgroundColor: colours[5],
                      border:
                        currColor == colours[5]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(5);
                      setEditPop(!editPop);
                    }}
                  ></div>
                  <div
                    className="editcl7"
                    style={{
                      backgroundColor: colours[6],
                      border:
                        currColor == colours[6]
                          ? "#959595 1px solid"
                          : ":#E7F1FB 1px solid",
                    }}
                    onClick={() => {
                      colorHandler(6);
                      setEditPop(!editPop);
                    }}
                  ></div>
                </div>
              </>
            )}
          </div>

          <div className="right-container">
            <div className="right-container-content">
              <div className="right-r1">
                <div className="right-r1-inputs">
                  <input
                    type="text"
                    className="uname-input"
                    value={enteredUserName}
                    placeholder="Username"
                    onBlur={() => {
                      nameHandler(
                        enteredUserName,
                        "uname-input",
                        "uname-invalid",
                        "input-error"
                      );
                    }}
                    onChange={(e) => {
                      setEnteredUserName(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="cpass-input"
                    placeholder="Current Password"
                    onBlur={() => {
                      passwordHandler(
                        enteredCurrentPassword,
                        "cpass-input",
                        "c-pass-invalid",
                        "input-error"
                      );
                    }}
                    onChange={(e) => {
                      setEnteredCurrentPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="right-r1-spans">
                  <span className="uname-invalid">UserName Invalid</span>
                  <span className="c-pass-invalid">Password Incorrect</span>
                </div>

                <span className="fr-pwd">Forgot Password?</span>
              </div>

              <div className="right-r2">
                <div className="right-r2-inputs">
                  <input
                    type="email"
                    className="email-input"
                    value={enteredEmail}
                    placeholder="Email ID"
                    onBlur={() => {
                      emailHandler(
                        enteredEmail,
                        "email-input",
                        "settings-email-invalid",
                        "input-error"
                      );
                    }}
                    onChange={(e) => {
                      setEnteredEmail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="npass-input"
                    placeholder="New Password"
                    onBlur={() => {
                      newPasswordHandler(
                        enteredNewPassword,
                        enteredCurrentPassword,
                        "npass-input",
                        "n-pas-invalid",
                        "input-error",
                        setReadyToUpdate
                      );
                      confirmPasswordHandler(
                        enteredNewPassword,
                        enteredConfirmPassword,
                        "copass-input",
                        "co-pas-invalid",
                        "input-error",
                        setReadyToUpdate
                      );
                    }}
                    onChange={(e) => {
                      setEnteredNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="right-r2-spans">
                  <span className="settings-email-invalid">Email Invalid</span>
                  <span className="n-pas-invalid">New Password Invalid</span>
                </div>
              </div>

              <div className="right-r3">
                <div className="right-r3-inputs">
                  <input
                    type="text"
                    className="phno-input"
                    value={enteredPhoneNo}
                    placeholder="Phone Number"
                    onBlur={() => {
                      phNoHandler(
                        enteredPhoneNo,
                        "phno-input",
                        "phno-invalid",
                        "input-error",
                        setReadyToUpdate
                      );
                    }}
                    onChange={(e) => {
                      setEnteredPhoneNo(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    className="copass-input"
                    placeholder="Confirm Password"
                    onBlur={() => {
                      confirmPasswordHandler(
                        enteredNewPassword,
                        enteredConfirmPassword,
                        "copass-input",
                        "co-pas-invalid",
                        "input-error",
                        setReadyToUpdate
                      );
                    }}
                    onChange={(e) => {
                      setEnteredConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="right-r3-spans">
                  <span className="phno-invalid">Phone Number Invalid</span>
                  <span className="co-pas-invalid">
                    Confirm Password Invalid
                  </span>
                </div>
              </div>

              <div className="right-r4">
                <span
                  style={{
                    fontSize: "18px",
                    color: "#00A9FF",
                    marginLeft: "1%",
                  }}
                >
                  Bio
                </span>
                <textarea
                  className="acc-info-Bioinput"
                  value={enteredBio}
                  onInput={() => {
                    checkCharacterLimit();
                  }}
                  onChange={(e) => {
                    setEnteredBio(e.target.value);
                  }}
                ></textarea>
                <span className="bio-invalid">Bio invalid</span>
              </div>

              <div className="right-r5">
                <div className="r5-left">
                  <button
                    className="update-btn"
                    style={{
                      color: "white",
                      backgroundColor: readyToUpdate ? "#00A9FF" : "gray",
                    }}
                    onClick={() =>
                      updateUser(
                        setAuthUser,
                        updatedInfo,
                        setUpdatePop,
                        setEnteredCurrentPassword,
                        setEnteredNewPassword,
                        setEnteredConfirmPassword
                      )
                    }
                    disabled={!readyToUpdate}
                  >
                    Update
                  </button>
                  <button
                    className="cancel-btn"
                    style={{ backgroundColor: "#EEEFF1" }}
                  >
                    Reset
                  </button>
                </div>

                <button
                  className="delete-acc-btn"
                  onClick={() => {
                    setShowDel(!showDel);
                  }}
                >
                  Delete your account
                </button>
              </div>
            </div>
          </div>
        </div>
        {showForm && (
          <div className="Add-Event-modal">
            <div
              className="ae-overlay"
              onClick={() => {
                setShowForm(!showForm);
              }}
            ></div>
            <div
              className="modal-container"
              style={{ left: clicked ? "18.5%" : "33%" }}
            >
              <div className="ae-modal-content">
                <input
                  type="text"
                  placeholder="Add Title"
                  className="addTitle"
                />
                <div className="time-div">
                  <img src={clock} style={{ cursor: "pointer" }} />

                  <label htmlFor="eventdate" id="def-date">
                    {getCurrentDate()}
                  </label>

                  <input
                    type="date"
                    id="eventdate"
                    onClick={() => {
                      console.log("first");
                      defDateHandler(event);
                    }}
                  />

                  <input
                    type="time"
                    value={inputStartTime}
                    // onClick={() => {
                    //   // generateTimeOptions("starttime-dropdown");
                    //   // startTimeHandler();
                    // }}
                    onChange={(event) => {
                      setInputStartTime(event.target.value);
                    }}
                    className="starttime-input"
                  />

                  {/* <div className="starttime-dropdown"></div> */}

                  <input
                    type="time"
                    value={inputEndTime}
                    // onClick={() => {
                    //   // generateTimeOptions("endtime-dropdown");
                    //   endTimeHandler();
                    // }}
                    onChange={(event) => {
                      setInputEndTime(event.target.value);
                    }}
                    className="endtime-input"
                  />

                  {/* <div className="endtime-dropdown"></div> */}
                </div>
                <div className="checkbox-div">
                  <input
                    type="checkbox"
                    id="check-i"
                    style={{ background: "transparent" }}
                  />
                  <span className="checkbox-span">All day</span>
                </div>
                <select className="select-event">
                  <option value="No">Do not repeat</option>
                  <option value="Yes">Repeat</option>
                </select>
                <div className="add-course">
                  <img src={bookIcon} style={{ cursor: "pointer" }} />
                  <span className="add-course-span">
                    Add My Courses in schedule
                  </span>
                </div>
                <div className="add-noti">
                  <img src={bellIcon} style={{ cursor: "pointer" }} />
                  <span className="add-noti-span">Add Notification</span>
                </div>
                <div className="save-btn">
                  <button
                    onClick={() => {
                      setShowForm(!showForm);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className="settingsMiddle-extra"
          style={{ right: clicked ? "0%" : "-24.5%" }}
        >
          <ProfileRight open={openRight} setOpen={setOpenRight} />
        </div>
      </div>
    </>
  );
};

export default SettingsMiddle;
