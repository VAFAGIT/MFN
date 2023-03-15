import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const register = (
    name,
    ICE,
    author,
    password,
    latitude,
    longitude,
  ) => {
    axios
      .post('http://192.168.9.71:5000/api/auth/register', {
        name,
        ICE,
        author,
        password,
        latitude,
        longitude,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        setErrorMessage(res.data.message);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`Register error ${e}`);
        setErrorMessage('Error registering user. Please try again.');
        setIsLoading(false);
      });
    setErrorMessage('');
    setIsLoading(false);
  };

  const login = (ICE, password) => {
    setIsLoading(true);
    axios
      .post('http://192.168.9.71:5000/api/auth/', {
        ICE,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);

    AsyncStorage.getItem('userInfo')
      .then((res) => {
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`Logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo || '');
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`isLoggedIn error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
