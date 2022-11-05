import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const BlueButton = (props) => {
  const navigation = useNavigation();
  return (
    <View style={tw`w-4/5 mx-auto p-4`}>
        <Pressable
            onPress={()=> {navigation.navigate('Login')}}
        >
        <Text
            style={tw`bg-blue-800 text-white uppercase rounded-lg text-center p-3 font-bold`}
        >
            {props.children}
        </Text>
        </Pressable>
    </View>
    
  )
}

export default BlueButton