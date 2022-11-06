import { View, Text, Image} from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const DetailScreen = ({route}) => {
  const detail = route.params.paramKey
  return (
    <View style={tw`flex flex-1 p-2`}>
      <Image
        source={{
            uri:detail.media.length > 0 ? detail.media : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        }}
        style={{ width: null, height: 300}}
      />
      <Text style={tw`text-center mt-2 font-bold text-2xl text-black`}>{detail.title}</Text>
      <Text style={tw`text-lg text-black text-center`}>{detail.summary}</Text>
    </View>
  )
}

export default DetailScreen