import { View, Text, TextInput, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import BlueButton from '../components/BlueButton';
import { Icon } from 'react-native-elements';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, updateUser } from 'firebase/auth'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  } from 'react-native-google-signin';
import { setCurrentUser } from '../store/slices/authslice'
import { useDispatch } from 'react-redux'


const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState('login')
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"",
      headerBackTitle:""
    })
  })

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
        updateUser(currentUser);
    });

    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

  }, [])

  const loginWithGoogle = async () =>{
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);
      navigation.replace('Home')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  const signIn = async() => {
    try {
      setLogin('login in...')
      const {user} = await signInWithEmailAndPassword(auth, email, password)
      dispatch(setCurrentUser({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        isAuthenticated: true
      }));
      navigation.replace('Home')
    } catch (error) {
      alert(error)
    }
    
  }
  return (
    <View style={tw`flex flex-1 bg-white pt-8`}>
      <Text style={tw`capitalize text-black text-4xl font-bold ml-8`}>welcome !</Text>
      <Text style={tw`text-xl font-bold ml-8`}> Sign in to continue</Text>
      <View style={tw`w-4/5 mx-auto mt-8`}>
        <TextInput
          style={tw`border-b-2 font-bold`}
          onChangeText={(text)=>{setEmail(text)}}
          value={email}
          placeholder="Email"
          keyboardType="text"
        />
        <TextInput
          style={tw`mt-10 border-b-2 font-bold`}
          onChangeText={(text)=>{setPassword(text)}}
          value={password}
          placeholder="Password"
          keyboardType="text"
          secureTextEntry={true}
        />
      </View>
      <View style={tw`w-4/5 mx-auto p-4 mt-8`}>
        <Pressable
            onPress={signIn}
        >
          <Text
              style={tw`bg-blue-800 text-white uppercase rounded-lg text-center p-3 font-bold`}
          >
              {login}
          </Text>
        </Pressable>
      </View>
      <View style={tw`border-b w-4/5 mx-auto mt-4`}></View>
      <View style={tw`mt-10`}>
        <Text style={tw`text-lg font-bold text-center`}>
          Social Media Login
        </Text>
        <Pressable style={tw`mx-auto`} onPress={loginWithGoogle}>
          <Image
            source={{
              uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
            }}
            style={{ width: 30, height: 30 }}
          />
          {/* <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
          /> */}
        </Pressable>
      </View>
      <View style={tw`flex flex-row ml-10 font-bold mx-auto mt-10`}>
        <Text>Don't have an account?</Text>
        <Text style={tw`pl-4 font-bold text-blue-800`}>Sign up</Text>
      </View>
    </View>
  )
}

export default LoginScreen