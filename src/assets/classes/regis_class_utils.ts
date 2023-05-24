import React from "react";
import axios, { AxiosResponse } from "axios";
import { Action, state_signup } from "../reducer_utils";
import {
  uploadBytesResumable,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { REDUCER_TYPE_SIGNUP } from "../reducer_utils";
export class CheckExist {
  private username: string;
  private url: string;

  constructor(username: string, url: string) {
    this.username = username;
    this.url = url;
  }

  async checkUsernameExists(): Promise<boolean> {
    try {
      const response: AxiosResponse = await axios.get(this.url);

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error occurred while checking username existence:", error);
      return false;
    }
  }
}

export class Register {
  private url;
  private state;
  private storageRef;
  constructor(url: string, state: state_signup, storageRef: StorageReference) {
    this.url = url;
    this.state = state;
    this.storageRef = storageRef;
  }

  async handlerSignup(): Promise<boolean> {
    const url = "http://localhost:4000/user/api/register";

    try {
      if (this.state.image) {
        await uploadBytesResumable(this.storageRef, this?.state.image).then(
          () => {
            getDownloadURL(this.storageRef).then(async (downloadURL) => {
              const data = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phone_number: this.state.phone_number,
                photoURL: downloadURL,
              };
              // fetch(url,{body:data})
              const response = await axios(this.url, {
                method: "post",
                data,
                headers: { "Content-Type": "application/json" },
              });
              if (response.status === 200) {
                return false;
              } else {
                return true;
              }
            });
          }
        );
      } else {
        const data = {
          username: this.state.username,
          password: this.state.password,
          phone_number: this.state.phone_number,
          email: this.state.email,
        };
        // fetch(url,{body:data})
        const response = await axios(url, {
          method: "post",
          data,
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    } catch (error) {
      console.error("Error occurred while checking username existence:", error);
      return false;
    }

    //   method: "post",
    //   data: {
    //     username: state_signUP.username,
    //     password: state_signUP.password,
    //     email: state_signUP.email,
    //   },
    // }).then(() => {
    //   alert("success");
    // });
  }
}
