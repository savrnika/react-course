import React, { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios.js";
import { MatxLoading } from "app/components";
import { _post,_patch,getUsers } from "app/apis/apiMethods";
import { toast } from "react-toastify";
import {useParams } from "react-router-dom";


const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
};

const setSession = (data) => {

  if (data.accessToken) {
    localStorage.setItem("accessToken", JSON.stringify(data));
    axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => { },
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (credential, password) => {

    try{
      const response = await _post(`/user/login`, {
        credential,
        password,
      });
      // const { accessToken } = response.data.data;
      const user = response.data.data;
      const { status } = response.data;
  
      if (status === true) {
        setSession(response.data.data);
        toast.success(response.data.message);
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch(e){
      toast.error(e.message);
    }
  };
  const register = async (formData) => {
    const response = await _post(`/user/register`, formData);
    const { status } = response.data;
    const { accessToken, user } = response.data.data;

    console.log(user, "user")
    if (status) {
      setSession(accessToken);
      toast.success(response.data.message);
      dispatch({
        type: "REGISTER",
        payload: {
          user,
        },
      });
    } else {
      toast.error(response.data.message);
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      //const { id } = useParams();
      // console.log("dhfkh",user)
      try {
        const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken && isValidToken(accessToken)) {
         setSession(accessToken);
        const response = await getUsers('/user/profile/:id')
            const { user } = response.data;
            //console.log(res)
            dispatch({
              type: "INIT",
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }catch (err) {
          console.error(err);
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      })();
    }, []);

    if (!state.isInitialised) {
      return <MatxLoading />;
    }

    return (
      <AuthContext.Provider
        value={{
          ...state,
          method: "JWT",
          login,
          logout,
          register,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;
