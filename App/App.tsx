import React from 'react';
import 'react-native-gesture-handler';

import Navigation from './Components/Navigation';
import { AuthProvider } from './context/AuthContext';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" /> 
      <Navigation />
    </AuthProvider>
  );
};
