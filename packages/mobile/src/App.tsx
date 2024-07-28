import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import app from './utils/firebase/config';

export default function App() {
  useEffect(() => {
    // Firebase is initialized
    console.log('Firebase initialized');
  }, []);
  return (
    <View>
      <Text>Welcome to Wensday Kalendar!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
