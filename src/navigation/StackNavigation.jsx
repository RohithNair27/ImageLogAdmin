import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from '../screens/LoginPage';
import DatesWorked from '../screens/DatesWorked';
import EmployeeHistory from '../screens/EmployeeHistory';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Emplotess',
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DatesWorked"
        component={DatesWorked}
        options={{
          title: 'Your employee',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="EmployeeHistory" component={EmployeeHistory} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  body: {},
});
