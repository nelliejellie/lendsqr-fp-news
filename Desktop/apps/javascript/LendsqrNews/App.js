import { View, Text, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "react-native-gesture-handler"
import FirstScreen from './screens/FirstScreen';


const App = () => {
  const Stack = createStackNavigator();

  const globalScreenOptions = {
    headerStyle: {backgroundColor: "white"},
    headerTitleStyle: {color: "black"},
    headerTintColor: "white"
  }
  return (
    <KeyboardAvoidingView
      style={{flex:1}}
      behavior=""
    >
      <NavigationContainer
      >
          <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen
              name='First'
              component={FirstScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name='Login'
              component={LoginScreen}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </KeyboardAvoidingView>
  )
}

export default App