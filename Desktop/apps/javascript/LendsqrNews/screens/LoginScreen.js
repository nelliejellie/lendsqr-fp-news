import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged,updateUser } from 'firebase/auth';
import { setCurrentUser } from '../store/slices/authslice'
import { useDispatch } from 'react-redux'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState('login')

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"",
      headerBackTitle:""
    })
  })

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
          navigation.replace("Home")
      }
    })
    isSignedIn()
  }, [])

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId:"652393634549-ut8pt3hfpcm6nr459dp4ha2gc6k9k2qv.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true
    })
  })

  const GoogleSignInUser = async () =>{
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("due", userInfo)
      navigation.navigate("Home")
    } catch (error) {
      console.log(error)
      if(error.code === statusCodes.SIGN_IN_CANCELLED){
        console.log("user canceled the login flow")
      }else if(error.code === statusCodes.IN_PROGRESS){
        console.log("signing in")
      }else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
        console.log("play services not available")
      }else{
        alert("something went wrong")
      }
    }
  }
  
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn(); 
    if(!isSignedIn){
      getCurrentUserInfo()
    }else{
      alert("please login")
    }
  }

  const getCurrentUserInfo = async() =>{
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED){
        alert('user has not signed in')
      }else{
        alert('something went wrong')
      }
    }
  }

  const signOut = async () =>{
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    } catch (error) {
      alert("error")
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
      setLogin("login")
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
        <View style={tw`mx-auto`}>
         <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={GoogleSignInUser}
         />
        </View>
      </View>
      <View style={tw`flex flex-row ml-10 font-bold mx-auto mt-10`}>
        <Text>Don't have an account?</Text>
        <Pressable onPress={()=>{navigation.navigate("Register")}}>
          <Text style={tw`pl-4 font-bold text-blue-800`}>Sign up.</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginScreen