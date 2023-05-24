import React, { ChangeEvent, useState } from "react";
import "../STYLES/Login/Login.css";
import { oAuthImages } from "../assets/util_oAuth_images";
import { motion as m } from "framer-motion";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillPhone,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContextApi";
//
/// login
import {
  reducer,
  REDUCER_TYPE,
  state_login,
  Action,
  state_signup,
  reducer_signup,
  REDUCER_TYPE_SIGNUP,
} from "../assets/reducer_utils";

//regex
import { patterns_check } from "../assets/regex_utils";

//firebase
import { storage } from "../firebase_config";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Axios from "axios";
import { REDUCER_USER } from "../contextAPI/AuthContextApi";
import {
  CheckExist as CheckExistAPI,
  Register as RegisterAPI,
} from "../assets/classes/regis_class_utils";
import io from "socket.io-client";
interface Check {
  username: boolean;
  password: boolean;
  email: boolean;
  phone_number: boolean;
  checkExist: boolean;
}
const Login = () => {
  const [toggleContainner, setToggleContainner] =
    React.useState<boolean>(false);
  const [toggleAuth, setToggleAuth] = React.useState<boolean>(false);
  const [togglePassword, setTogglePassword] = React.useState<boolean>(false);
  const [togglePasswordSigUp, setTogglePasswordSignUp] =
    React.useState<boolean>(false);
  ///boolean object

  const [CheckedText, setCheckedText] = React.useState<Check>({
    username: false,
    password: false,
    email: false,
    phone_number: false,
    checkExist: false,
  });

  const allChecked =
    CheckedText.username &&
    CheckedText.password &&
    CheckedText.email &&
    CheckedText.phone_number &&
    !CheckedText.checkExist;

  const navigation = useNavigate();
  const initialState: state_login = {
    username: "",
    password: "",
  };
  const initialState_signup: state_signup = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    image: null,
  };
  // context API
  const { DispatchContext } = React.useContext(AuthContext);
  // login
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [loading, setloading] = React.useState<boolean>(false);
  const [state_signUP, dispatch_signUP] = React.useReducer(
    reducer_signup,
    initialState_signup
  );

  //handlerLogin
  const storageRef = ref(storage, "/Master/" + Date.now().toString());

  //*** USING CLASS */
  async function checkExist_usernmae(username: string) {
    const url = `http://localhost:4000/user/api/checkExists/${username}`;
    const checkedAPI = new CheckExistAPI(state_signUP.username, url);
    const checked = await checkedAPI.checkUsernameExists();
    setCheckedText((prev) => ({ ...prev, checkExist: checked }));
  }
  async function handlerSignup() {
    const url = "http://localhost:4000/user/api/register";
    const registerAPI = new RegisterAPI(url, state_signUP, storageRef);

    const result_Status = await registerAPI.handlerSignup();

    if (result_Status) {
      //set
      dispatch({
        type: REDUCER_TYPE.USERNAME_LOGIN,
        payload: state_signUP.username,
      });
      dispatch({
        type: REDUCER_TYPE.PASSWORD_LOGIN,
        payload: state_signUP.password,
      });
      //clear
      dispatch_signUP({
        type: REDUCER_TYPE_SIGNUP.USERNAME_SIGNUP,
        payload: "",
      });
      dispatch_signUP({
        type: REDUCER_TYPE_SIGNUP.PASSWORD_SIGNUP,
        payload: "",
      });
      dispatch_signUP({
        type: REDUCER_TYPE_SIGNUP.EMAIL_SIGNUP,
        payload: "",
      });
      dispatch_signUP({
        type: REDUCER_TYPE_SIGNUP.PHONE_NUMBER_SIGNUP,
        payload: "",
      });
      dispatch_signUP({
        type: REDUCER_TYPE_SIGNUP.IMAGE_SIGNUP,
        payload: null,
      });

      alert("Succeeded..!:)");
      setToggleContainner((prev) => !prev);
    } else {
      alert("Failed");
    }
  }
  async function handlerLogin() {
    /// check Axios
    /// context API
    ///relocate to Home
    const url = "http://localhost:4000/user/api/login";

    const data = {
      username: state.username,
      password: state.password,
    };
    const response = await Axios(url, {
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      DispatchContext &&
        DispatchContext({
          type: REDUCER_USER.ADD_DATAS,
          payload: response.data.result,
        });
      navigation("Home");
      alert("Login Successfully..!!");
    } else {
      alert("Failed due to either cookies or none of account exist.!");
    }
    // DispatchContext &&
    //   DispatchContext({ type: REDUCER_USER.ADD_DATAS, payload: state_signUP });
    // navigation("Home");
  }

  //state **
  React.useEffect(() => {
    function validate(
      filename: keyof typeof patterns_check,
      state: state_signup
    ) {
      const checked = patterns_check[filename].test(state[filename]); // Error

      setCheckedText((prev) => ({ ...prev, [filename]: checked }));
    }

    Object.keys(patterns_check).forEach((filename) => {
      validate(filename as keyof typeof patterns_check, state_signUP);
    });
  }, [state_signUP]);

  // sign up
  return (
    <div className="container_login">
      <div className="section_register">
        <div
          className={
            toggleContainner
              ? "container_register active"
              : "container_register"
          }
        >
          <div
            className={
              toggleContainner ? "boxes_register active" : "boxes_register"
            }
          >
            <span className="header_login">Login</span>
            {/* <input
              type="file"
              accept=".jpg, .jpeg, .png, image/jpeg, image/png"
              name="image_input"
              id="image_input"
            /> */}
            {/* <div className="selector_container">
              <img
                src={"https://picsum.photos/id/237/200/300"}
                className="profile"
              />
              <label htmlFor="image_input" id="image_label">
                g
              </label>
            </div> */}
            {/* <span className="header">Profile</span> */}
            <div className="wrapper_inputInfo">
              <input
                value={state.username}
                style={{
                  outlineColor:
                    state.username.length === 0 ? "orange" : "mediumseagreen",
                }}
                type="text"
                placeholder="@Username"
                className="inputInfo"
                onChange={(e) =>
                  dispatch({
                    type: REDUCER_TYPE.USERNAME_LOGIN,
                    payload: e.target.value,
                  })
                }
              />
              <AiOutlineUser size={30} className="iconInfo" color="grey" />
            </div>

            <div className="wrapper_inputInfo">
              <input
                value={state.password}
                style={{
                  outlineColor:
                    state.password.length === 0 ? "orange" : "mediumseagreen",
                }}
                type={togglePassword ? "text" : "password"}
                placeholder="@Password"
                className="inputInfo"
                onChange={(e) =>
                  dispatch({
                    type: REDUCER_TYPE.PASSWORD_LOGIN,
                    payload: e.target.value,
                  })
                }
              />
              {togglePassword ? (
                <AiFillEye
                  size={30}
                  className="iconInfo"
                  color="grey"
                  onClick={() => setTogglePassword((prev) => !prev)}
                />
              ) : (
                <AiFillEyeInvisible
                  size={30}
                  className="iconInfo"
                  color="grey"
                  onClick={() => setTogglePassword((prev) => !prev)}
                />
              )}
            </div>
            {/* <span>Or</span> */}

            {toggleAuth ? (
              <m.div className="container_oAuth">
                {oAuthImages &&
                  oAuthImages.map((item, index) => (
                    <m.div
                      animate={{ y: toggleAuth ? 0 : -120 }}
                      key={index}
                      className="wrapper_oAuth"
                    >
                      <img src={item.image} alt="" className="image_icon" />
                      <span className="">{item.title}</span>
                    </m.div>
                  ))}
                <span
                  className="GetBack"
                  onClick={() => setToggleAuth((prev) => !prev)}
                >
                  GetBack
                </span>
              </m.div>
            ) : (
              <div
                className="Authentication"
                onClick={() => setToggleAuth((prev) => !prev)}
              >
                <span>Authentication</span>
              </div>
            )}
            <div className="desc_dont_ghave_account">
              <p>Do you have your own account yet ?</p>
              <span>if so feel free to make one </span>
              <span
                className="register"
                onClick={() => setToggleContainner((prev) => !prev)}
              >
                register
              </span>
            </div>

            <button className="button_login" onClick={handlerLogin}>
              Login
            </button>
          </div>

          <div
            className={
              toggleContainner ? "boxes_enroll" : "boxes_enroll active"
            }
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png, image/jpeg, image/png"
              name="image_input"
              id="image_input"
              onChange={(e) => {
                dispatch_signUP({
                  type: REDUCER_TYPE_SIGNUP.IMAGE_SIGNUP,
                  payload: e?.target?.files?.[0],
                });

                console.log(e.target.files?.[0]);
              }}
            />
            <div className="selector_container">
              {state_signUP.image ? (
                <img
                  src={URL.createObjectURL(state_signUP.image)}
                  className="profile"
                />
              ) : (
                <img
                  className="profile"
                  src={require("../assets/logos/man.png")}
                />
              )}
              <label htmlFor="image_input" id="image_label">
                g
              </label>
            </div>
            <span className="header_signup">Welcome</span>
            <div className="wrapper_inputInfo">
              <input
                value={state_signUP.username}
                style={{
                  outlineColor: CheckedText.username
                    ? "mediumseagreen"
                    : state_signUP.username.length !== 0
                    ? "red"
                    : "orange",
                }}
                type="text"
                placeholder="@Username"
                className="inputInfo"
                onChange={(e) => {
                  e.target.value && checkExist_usernmae(e?.target.value);

                  dispatch_signUP({
                    type: REDUCER_TYPE_SIGNUP.USERNAME_SIGNUP,
                    payload: e.target.value,
                  });
                }}
              />
              <AiOutlineUser size={30} className="iconInfo" color="grey" />
              <span
                className="available_username"
                style={{
                  color: CheckedText.checkExist ? "crimson" : "mediumseagreen",
                }}
              >
                {state_signUP.username.length === 0
                  ? ""
                  : CheckedText.checkExist
                  ? "This usernmae is alread in use"
                  : "Available username"}
              </span>
            </div>
            <div className="wrapper_inputInfo">
              <input
                value={state_signUP.password}
                style={{
                  outlineColor: CheckedText.password
                    ? "mediumseagreen"
                    : state_signUP.password.length !== 0
                    ? "red"
                    : "orange",
                }}
                type={togglePasswordSigUp ? "text" : "password"}
                placeholder="@Password"
                className="inputInfo"
                onChange={(e) =>
                  dispatch_signUP({
                    type: REDUCER_TYPE_SIGNUP.PASSWORD_SIGNUP,
                    payload: e.target.value,
                  })
                }
              />
              {togglePasswordSigUp ? (
                <AiFillEye
                  size={30}
                  className="iconInfo"
                  color="grey"
                  onClick={() => setTogglePasswordSignUp((prev) => !prev)}
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setTogglePasswordSignUp((prev) => !prev)}
                  size={30}
                  className="iconInfo"
                  color="grey"
                />
              )}
            </div>
            <div className="wrapper_inputInfo">
              <input
                value={state_signUP.email}
                style={{
                  outlineColor: CheckedText.email
                    ? "mediumseagreen"
                    : state_signUP.email.length !== 0
                    ? "red"
                    : "orange",
                }}
                type="text"
                placeholder="@Email"
                className="inputInfo"
                onChange={(e) =>
                  dispatch_signUP({
                    type: REDUCER_TYPE_SIGNUP.EMAIL_SIGNUP,
                    payload: e.target.value,
                  })
                }
              />
              <AiOutlineMail size={30} className="iconInfo" color="grey" />
            </div>
            <div className="wrapper_inputInfo">
              <input
                value={state_signUP.phone_number}
                maxLength={10}
                style={{
                  outlineColor: CheckedText.phone_number
                    ? "mediumseagreen"
                    : state_signUP.phone_number.length !== 0
                    ? "red"
                    : "orange",
                }}
                type="text"
                placeholder="@Phone-number"
                className="inputInfo"
                onChange={(e) =>
                  dispatch_signUP({
                    type: REDUCER_TYPE_SIGNUP.PHONE_NUMBER_SIGNUP,
                    payload: e.target.value,
                  })
                }
              />
              <AiFillPhone size={30} className="iconInfo" color="grey" />
            </div>

            <div className="desc_signup">
              {toggleContainner && (
                <span>
                  if you alread have your won account, please feel free to
                  login. Warning dont forget to secure your password with our
                  guidance.
                </span>
              )}

              <a onClick={() => setToggleContainner((prev) => !prev)}>
                <span> Login Here</span>
              </a>
            </div>
            <button
              className="button_signup"
              onClick={() => {
                if (allChecked) {
                  handlerSignup();
                  // navigation("/");
                } else {
                  alert(
                    "Some of the informations is not filled correctly..!! please check"
                  );
                }
              }}
            >
              {loading && (
                <span>Upload Image... please wait for compressing images</span>
              )}
              <span>SignUp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
