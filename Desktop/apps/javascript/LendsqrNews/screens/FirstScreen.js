import { View, Text, Image } from 'react-native'
import React, {useLayoutEffect} from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import BlueButton from '../components/BlueButton';
import SignUpButton from '../components/SignUpButton';


const FirstScreen = () => {
  const navigation = useNavigation()
  
  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`flex flex-row m-3`}>
        <Image
          source={{
            uri: "https://media.istockphoto.com/vectors/abstract-globe-background-vector-id1311148884?k=20&m=1311148884&s=612x612&w=0&h=2zFGLiw0VmQbh_CFQgbTzaaamRygqILdq1T8QuglBSQ=",
          }}
          style={{ width: 30, height: 30 }}
        />
        <Text style={tw`text-xl font-bold ml-2`}>Lender News</Text>
      </View>
      <View style={tw`flex flex-row justify-center mt-12`}>
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1299342690/vector/multicultural-group-of-people-people-of-different-races-and-cultures-cartoon-characters-set.jpg?s=612x612&w=is&k=20&c=KXJHrSWje1Df2O2nGYHucw9eJJ3yteV_3ztzPtNOX_Y=",
          }}
          style={{ width: 300, height: 300 }}
        />
      </View>
      <View style={tw`mx-auto mt-10`}>
        <Text style={tw`text-center font-bold text-2xl`}>Welcome !</Text>
        <Text style={tw`text-center font-semibold`}>
          To the best news platform there is
        </Text>
      </View>
      <View>
        <BlueButton>
          Login
        </BlueButton>
      </View>
      <View>
        <SignUpButton/>
      </View>
    </View>
    
  )
}

export default FirstScreen