import {KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import "react-native-gesture-handler"
import FirstScreen from './screens/FirstScreen';
import HomeScreen from './screens/HomeScreen';
import { store } from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  const Stack = createStackNavigator();
  

  const globalScreenOptions = {
    headerStyle: {backgroundColor: "white"},
    headerTitleStyle: {color: "black"},
    headerTintColor: "black",
  }
  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{flex:1}}
          behavior={Platform.OS === "ios" ? "padding" : null}
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
                <Stack.Screen
                  name='Home'
                  component={HomeScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Provider>
    
  )
}

export default App