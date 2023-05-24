import React, { Dispatch } from "react";
interface AuthContextApi {
  children: React.ReactNode;
}

interface Action {
  type: string;
  payload: any;
}
/// pictureProfile
export interface DataProps {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  photoURL: string | undefined;
  _id: string;
}
interface State {
  user: DataProps;
}
export interface initialState {
  user: DataProps;
  DispatchContext?: Dispatch<Action>; //DISpatchAction
}

export enum REDUCER_USER {
  ADD_DATAS = "ADD_DATAS",
}
const initialStateContext = {
  user: {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    photoURL: undefined,
    _id: "",
  },
  DispatchContext: () => {}, /// how to define that correctly ()=>{}
};
const initialState = {
  user: {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    photoURL: undefined,
    _id: "",
  },
};
export const AuthContext =
  React.createContext<initialState>(initialStateContext);
const AuthContextApi = ({ children }: AuthContextApi) => {
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case REDUCER_USER.ADD_DATAS:
        return {
          ...state,
          user: { ...action.payload },
        };

      default:
        return state;
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const context: initialState = {
    user: state.user,
    DispatchContext: dispatch,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContextApi;
