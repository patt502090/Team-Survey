import React, { useEffect, ReactNode } from 'react';
import { useSetState } from 'react-use';
import conf from '../conf/main';
import ax, { axData } from '../conf/ax';

export const AuthContext = React.createContext<AuthContextProps | null>(null);

interface User {
  id: number;
  role: {
    name: string;
  };
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoginPending: boolean;
  loginError: Error | null;
  userRole: string | null;
}

interface AuthContextProps {
  state: AuthState;
  login: (username: string, password: string) => void;
  logout: () => void;
  changeRole: (role: string) => void;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isLoginPending: false,
  loginError: null,
  userRole: null,
};

const updateJwt = (jwt: string | null) => {
  axData.jwt = jwt;
  if (jwt) {
    sessionStorage.setItem(conf.jwtSessionStorageKey, jwt);
  } else {
    sessionStorage.removeItem(conf.jwtSessionStorageKey);
  }
};

export const ContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [state, setState] = useSetState<AuthState>(initialState);

  const setLoginPending = (isLoginPending: boolean) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn: boolean, user: User | null) => setState({ isLoggedIn, user });
  const setLoginError = (loginError: Error | null) => setState({ loginError });
  const setUserRole = (userRole: string) => setState({ userRole });

  const handleLoginResult = (error: Error | null, result: { user?: User; jwt?: string } | null) => {
    setLoginPending(false);
    if (result && result.user) {
      if (result.jwt) {
        updateJwt(result.jwt);
      }
      setLoginSuccess(true, result.user);
      setUserRole(result.user.role.name);
    } else if (error) {
      setLoginError(error);
    }
  };

  useEffect(() => {
    setLoginPending(true);
    loadPersistedJwt(handleLoginResult);
  }, []);

  const login = (username: string, password: string) => {
    setLoginPending(true);
    setLoginSuccess(false, null); // ส่ง null เป็น user
    setLoginError(null);

    fetchLogin(username, password, handleLoginResult);
  };

  const changeRole = (role: string) => {
    setUserRole(role);
  };

  const logout = () => {
    setLoginPending(false);
    updateJwt(null);
    setLoginSuccess(false, null);
    setLoginError(null);
    setUserRole(null);
    sessionStorage.removeItem(conf.roleSessionStorageKey);
  };

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

const fetchLogin = async (username: string, password: string, callback: (error: Error | null, result: { user?: User; jwt?: string } | null) => void) => {
  try {
    const response = await ax.post(conf.loginEndpoint, {
      identifier: username,
      password,
    });
    if (response.data.jwt && response.data.user.id > 0) {
      callback(null, response.data);
    } else {
      callback(new Error('Invalid username and password'), null);
    }
  } catch (e) {
    callback(new Error('Fail to initiate login'), null);
  }
};

const loadPersistedJwt = async (callback: (error: Error | null, result: { user?: User; userRole?: string } | null) => void) => {
  try {
    const persistedJwt = sessionStorage.getItem(conf.jwtSessionStorageKey);
    if (persistedJwt) {
      axData.jwt = persistedJwt;
      const response = await ax.get(conf.jwtUserEndpoint);
      if (response.data.id > 0) {
        callback(null, { user: response.data, userRole: response.data.role.name });
      } else {
        callback(null, null);
      }
    } else {
      callback(null, null);
    }
  } catch (e) {
    console.log(e);
    callback(new Error('Fail to initiate auto login'), null);
  }
};
