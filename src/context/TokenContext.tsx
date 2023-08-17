import { FC, ReactNode, createContext, useState } from 'react';

export type TokenTypeState = {
  token: string;
  setToken: (token: string) => void;
};

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('accessToken');
  return token || '';
};

const setTokenToLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const TokenContext = createContext<TokenTypeState>({
  token: getTokenFromLocalStorage(),
  setToken: (token) => {
    setTokenToLocalStorage(token);
  },
});

export const TokenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, _setToken] = useState(getTokenFromLocalStorage());
  const setToken = (token: string) => {
    _setToken(token);
    setTokenToLocalStorage(token);
  };
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
