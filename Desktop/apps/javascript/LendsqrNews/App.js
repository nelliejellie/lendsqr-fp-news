import { View, Text } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'


const App = () => {
  return (
    <View>
      <Text style={tw`text-2xl bg-blue-300`}>App</Text>
    </View>
  )
}

export default App