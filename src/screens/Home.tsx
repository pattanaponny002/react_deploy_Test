import React from "react";
import "../STYLES/Home/Home.css";
import { DiReact } from "react-icons/di";
import {
  AiFillAndroid,
  AiFillApple,
  AiFillAppstore,
  AiFillFolder,
  AiOutlineArrowRight,
  AiOutlineMenu,
} from "react-icons/ai";
import TypeWritter from "typewriter-effect";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  type Swiper as SwiperRef,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle"; // swiper css
import { productImage } from "../assets/image_utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPI/AuthContextApi";
import io, { Socket } from "socket.io-client";
const Home = () => {
  const [toggleDrawer, setToggleDrawer] = React.useState<boolean>(false);
  const [screenWith, setScreenWith] = React.useState<number>(0);

  //context API
  // const socket = io("http://localhost:4000");
  const socket = React.useRef<Socket | null>(null);
  // socket.on("connect", () => {
  //   alert("Connected to Socket.IO server");
  // });
  const { user, DispatchContext } = React.useContext(AuthContext);
  const navigation = useNavigate();
  function handlerResize() {
    setScreenWith((prev) => window.innerWidth);
  }
  function handlerScroll() {
    setScreenWith((prev) => window.innerWidth);
  }
  function onTestSocket() {
    const hell = "master" + Math.random() * 10;
    socket.current?.emit("welcome", hell);
  }

  React.useEffect(() => {
    socket.current = io("http://localhost:4000");
    window.addEventListener("resize", handlerResize);
    window.addEventListener("scroll", handlerResize);
    return () => {
      window.removeEventListener("resize", handlerResize);
      window.removeEventListener("scroll", handlerResize);
    };
  }, []);
  React.useEffect(() => {
    socket.current?.emit("addUser", user);
  }, [user]);
  return (
    <div className="container_home">
      <section className="section1">
        <div className="container_navigation">
          <span className="Home">
            <a className="user_available">
              <span className="profile">
                <img src={user.photoURL} />
              </span>
              <span className="username">{user.username}</span>
            </a>
          </span>
          <span className="Logo">
            <AiOutlineMenu
              className="icon_react"
              size={50}
              onClick={() => setToggleDrawer((prev) => !prev)}
            />
          </span>
          <ul
            className={
              toggleDrawer
                ? screenWith < 800
                  ? "navigation active"
                  : "navigation"
                : "navigation"
            }
          >
            <li className="header_application">
              <DiReact className="icon_react" size={80} color="white" />
              <a href="">
                <span>MasterApp</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>Application</span>
              </a>
            </li>
            <li>
              <a href="">
                <span>Setting</span>
              </a>
            </li>

            <li>
              {!user ? (
                <a className="user_available">
                  <span onClick={() => navigation("/")}>Login:</span>
                </a>
              ) : (
                <a className="user_available">
                  <span className="profile">
                    <img src={user.photoURL} />
                  </span>
                  <span className="username">{user.username}</span>
                </a>
              )}
            </li>

            <li>
              {!user ? (
                <a href="" className="sign_up">
                  <span>Sign UP</span>
                </a>
              ) : (
                <a onClick={() => navigation("/")} className="log_out">
                  <span>Logout</span>
                </a>
              )}
            </li>
          </ul>
        </div>

        <div className="content_section1">
          <div className="introduction">
            <div className="content_introduction">
              <span className="header_hello">
                <span className="emphasized_text">Hello</span> I'm front-ended
                developer
              </span>
              <div className="container_writter">
                <TypeWritter
                  options={{
                    strings: [
                      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",

                      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here.",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
              </p>
              <div className="container_button">
                <button className="button_click" onClick={onTestSocket}>
                  <span>Click</span>
                  <AiOutlineArrowRight size={30} color="white" />
                </button>
                {!user ? (
                  <button className="button_click_2">
                    <span>Log In</span>
                  </button>
                ) : (
                  <button
                    className="button_click_2"
                    onClick={() => navigation("/SectionContent")}
                  >
                    <span>Free trial</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="expert">
            <img
              className="img"
              src={require("../assets/experts/person.png")}
              alt=""
            />

            <Swiper
              navigation={screenWith < 800 ? true : false}
              className="container_Slider"
              autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
              modules={[Autoplay, Navigation]}
              loop
            >
              {productImage &&
                productImage.map((item, index) => (
                  <SwiperSlide className="wrapperItem">
                    <img className="imageItem" src={item} />
                    <div className="sub_desc">
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="medium_expert">
              <div className="wrapper_icon">
                <AiFillAndroid size={60} color="lightgreen" />
                <span>Android</span>
              </div>
              <div className="wrapper_icon">
                <AiFillApple size={60} />
                <span>Apple IOS</span>
              </div>
              <div className="wrapper_icon">
                <DiReact size={60} color="rgba(10, 194, 250, 0.8)" />
                <span>React Native</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
