import { View, Text, Pressable, TextInput, Image } from 'react-native'
import React, {useState, useLayoutEffect, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile,  onAuthStateChanged, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

const RegisterScreen = () => {
  // state variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullname] = useState('')
  const [signupText, setSignupText] = useState('signup')
  // state ends
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  }, [])

  const Register = async () =>{
    try{
        setSignupText('signing up...')
        const {user} = await createUserWithEmailAndPassword(auth,email,password)
        await updateProfile(user, {
          displayName: fullName,
        });
        dispatch(setCurrentUser({
          name: fullName,
          email: email,
          isAuthenticated: true
        }));
        setEmail('')
        setFullname('')
        setPassword('')
        navigation.replace('Home')
    }catch(error){
          alert(error)
    }
  }

  return (
    <View style={tw`flex flex-1 bg-white pt-8`}>
      <Text style={tw`capitalize text-black text-4xl font-bold ml-8`}>Hi !</Text>
      <Text style={tw`text-xl font-bold ml-8`}>Create a new account</Text>
      <View style={tw`w-4/5 mx-auto mt-8`}>
        <TextInput
          style={tw`border-b-2 font-bold`}
          onChangeText={(text)=>{setFullname(text)}}
          value={fullName}
          placeholder="Full Name"
          keyboardType="text"
        />
        <TextInput
          style={tw`border-b-2 font-bold mt-10`}
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
          keyboardType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={tw`w-4/5 mx-auto p-4 mt-8`}>
        <Pressable
            onPress={Register}
        >
          <Text
              style={tw`bg-blue-800 text-white uppercase rounded-lg text-center p-3 font-bold`}
          >
              {signupText}
          </Text>
        </Pressable>
      </View>
      <View style={tw`border-b w-4/5 mx-auto mt-4`}></View>
      <View style={tw`mt-10`}>
        <Text style={tw`text-lg font-bold text-center`}>
          Social Media Login
        </Text>
        <Pressable style={tw`mx-auto`} onPress={()=>{navigation.navigate("Login")}}>
          <Image
            source={{
              uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
            }}
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
      </View>
      <View style={tw`flex flex-row ml-10 font-bold mx-auto mt-10`}>
        <Text>Don't have an account?</Text>
        <Text style={tw`pl-4 font-bold text-blue-800`}>Sign in</Text>
      </View>
    </View>
  )
}

export default RegisterScreen