import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const SignUpButton = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`w-4/5 mx-auto p-4`}>
        <Pressable
            onPress={()=> {navigation.navigate("Register")}}
        >
        <Text
            style={tw`bg-white text-blue-800 uppercase border border-blue-800 border-2 rounded-lg text-center p-3 font-bold`}
        >
            Sign Up
        </Text>
        </Pressable>
    </View>
  )
}

export default SignUpButton