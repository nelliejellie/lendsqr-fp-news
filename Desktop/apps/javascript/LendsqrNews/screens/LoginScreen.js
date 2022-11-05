import { View, Text, TextInput, Image, Pressable, TouchableWithoutFeedback, Keyboard, Button } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import BlueButton from '../components/BlueButton';
import { Icon } from 'react-native-elements';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged,updateUser } from 'firebase/auth';
import { setCurrentUser } from '../store/slices/authslice'
import { useDispatch } from 'react-redux'
import {
  GoogleSignin,
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
    onAuthStateChanged(auth, (currentUser) => {
        updateUser(currentUser);
        navigation.replace('Home')
    });
  }, [])

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
        <Pressable style={tw`mx-auto`}>
          <Button title={'Sign in with Google'} onPress={() =>  {
            GoogleSignin.configure({
                androidClientId: '166373312830-vkp70v672j43r0trs6pelhfeqg6nnp2p.apps.googleusercontent.com',
            });
              GoogleSignin.hasPlayServices().then((hasPlayService) => {
                      if (hasPlayService) {
                          GoogleSignin.signIn().then((userInfo) => {
                                    console.log(JSON.stringify(userInfo))
                          }).catch((e) => {
                          console.log("ERROR IS: " + JSON.stringify(e));
                          })
                      }
              }).catch((e) => {
                  console.log("ERROR IS: " + JSON.stringify(e));
              })
            }} 
          />

        </Pressable>
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