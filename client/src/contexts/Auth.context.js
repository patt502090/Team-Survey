"use client"
import React,{useEffect} from 'react';
import { useSetState } from 'react-use';
import conf from '../conf/main'
import ax, { axData } from '../conf/ax'

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoginPending: false,
  loginError: null,
  userRole: null,
}

const updateJwt = (jwt) => {
  axData.jwt = jwt
  if(jwt){
    sessionStorage.setItem(conf.jwtSessionStorageKey, jwt)
  }else{
    sessionStorage.removeItem(conf.jwtSessionStorageKey)
  }
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn, user) => setState({ isLoggedIn, user});
  const setLoginError = (loginError) => setState({ loginError });
  const setUserRole = (userRole) => setState({ userRole });

  const handleLoginResult = (error, result) => {
    setLoginPending(false);
    if (result && result.user) {
      if (result.jwt) {
        updateJwt(result.jwt)
      }
      setLoginSuccess(true, result.user);
      setUserRole(result.user.role.name)
    } else if (error) {
      setLoginError(error);
    }
  }

  useEffect(() => {
    setLoginPending(true)
    loadPersistedJwt(handleLoginResult)
  }, [])

  const login = (username, password) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin(username, password, handleLoginResult)
  }

  const changeRole = (role) => {
    setUserRole(role)
  }

  const logout = () => {
    setLoginPending(false);
    updateJwt(null)
    setLoginSuccess(false);
    setLoginError(null);
    setUserRole(null);
    sessionStorage.removeItem(conf.roleSessionStorageKey)
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        changeRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchLogin = async (username, password, callback) => {
  try {
    const response = await ax.post(conf.loginEndpoint, {
      identifier: username,
      password
    })
    if (response.data.jwt && response.data.user.id > 0) {
      callback(null, response.data)
    } else {
      callback(new Error('Invalid username and password'))
    }
  } catch (e) {
    callback(new Error('Fail to initiate login'))
  }
}

const loadPersistedJwt = async (callback) => {
  try {
    const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey)
    if (persistedJwt) {
      axData.jwt = persistedJwt
      const response = await ax.get(conf.jwtUserEndpoint)
      if (response.data.id > 0) {
        callback(null, {user: response.data, userRole: response.data.role.name })
      } else {
        callback(null)
      }
    }
  } catch (e) {
    callback(new Error('Fail to initiate auto login'))
  }
}