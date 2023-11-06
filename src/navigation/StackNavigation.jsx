import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from '../screens/LoginPage';
import DatesWorked from '../screens/DatesWorked';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={styles.body}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DatesWorked" component={DatesWorked} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  body: {
    headerShown: false,
  },
});
