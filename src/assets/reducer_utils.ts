import { DataProps } from "../contextAPI/AuthContextApi";

export interface state_login {
  username: string;
  password: string;
}

export interface Action {
  type: string;
  payload?: any; // Optional payload property
}
export enum REDUCER_TYPE {
  USERNAME_LOGIN = "USERNAME_LOGIN",
  PASSWORD_LOGIN = "PASSWORD_LOGIN",
}
// REDUCER AUTH_CONTEXT
export function reducer(state: state_login, action: Action): state_login {
  switch (action.type) {
    case REDUCER_TYPE.USERNAME_LOGIN:
      //return acase
      return {
        ...state,

        username: action.payload,
      };
    case REDUCER_TYPE.PASSWORD_LOGIN:
      //return acase
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
}

/// REDUCER SIGNUP

export interface state_signup {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  image: File | null;
}

export enum REDUCER_TYPE_SIGNUP {
  USERNAME_SIGNUP = "USERNAME_SIGNUP",
  PASSWORD_SIGNUP = "PASSWORD_SIGNUP",
  EMAIL_SIGNUP = "EMAIL_SIGNUP",
  PHONE_NUMBER_SIGNUP = "PHONE_NUMBER_SIGNUP",
  IMAGE_SIGNUP = "IMAGE_SIGNUP",
}
export function reducer_signup(
  state: state_signup,
  action: Action
): state_signup {
  switch (action.type) {
    case REDUCER_TYPE_SIGNUP.USERNAME_SIGNUP:
      //return acase

      return {
        ...state,
        username: action.payload,
      };
    case REDUCER_TYPE_SIGNUP.PASSWORD_SIGNUP:
      //return acase
      return {
        ...state,
        password: action.payload,
      };
    case REDUCER_TYPE_SIGNUP.EMAIL_SIGNUP:
      //return acase
      return {
        ...state,
        email: action.payload,
      };
    case REDUCER_TYPE_SIGNUP.PHONE_NUMBER_SIGNUP:
      //return acase
      return {
        ...state,
        phone_number: action.payload,
      };
    case REDUCER_TYPE_SIGNUP.IMAGE_SIGNUP:
      //return acase
      return {
        ...state,
        image: action.payload,
      };

    default:
      return state;
  }
}

/// REDUCER CHAT CONTEXT

export interface state_chat {
  chatId: string;
  user: DataProps;
}
export interface state_chat_data {
  data: state_chat;
}

export enum REDUCER_TYPE_CHAT {
  ADD_CHAT = "ADD_CHAT",
}
export function reducer_chat(
  state: state_chat_data,
  action: Action
): state_chat_data {
  switch (action.type) {
    case REDUCER_TYPE_CHAT.ADD_CHAT:
      return { ...state, data: { ...action.payload } };

    default:
      return state;
  }
}
