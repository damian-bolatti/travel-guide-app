import React from 'react';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView>
      <Redirect href="/cities" />
    </SafeAreaView>
  );
};

export default App;
