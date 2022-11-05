import { View, Text, Pressable, TouchableOpacity, Image, FlatList} from 'react-native'
import React, {useLayoutEffect, useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import tw from 'tailwind-react-native-classnames'
import options from '../api/options';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([])

  const signOut = () =>{
    auth.signOut().then(()=>{
      navigation.replace("Login")
    })
  }

  const getNews = () =>{
    fetch('https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=en&media=True', options)
      .then(response => response.json())
      .then(response => (
        setNews(response.articles)
      ))
      .catch(err => console.error(err));
      }

  useEffect(()=>{
    getNews()
    console.log(news[0])
  },[navigation])

  useLayoutEffect(() =>{
    navigation.setOptions({
      title:"",
      headerBackTitle:"",
      headerLeft: ()=>(
        <View style={tw`pl-2`}>
          <Text style={tw`font-bold text-blue-800`}>Welcome {auth?.currentUser?.displayName}</Text>
        </View>
      ),
      headerRight: () =>(
        <View style={tw`flex flex-row justify-around w-20 pl-2`}>
          <Pressable onPress={signOut}>
            <Text style={tw`font-bold`}>Logout</Text>
          </Pressable>
        </View>
      )
    })
  })
  return (
    <View style={tw`flex flex-row justify-center`}>
      <View style={tw`bg-blue-800 w-full mx-auto`}>
        <Text style={tw`text-center text-white font-bold text-2xl uppercase mt-3`}>Headlines</Text>
        <FlatList
          data={news}
          vertical
          keyExtractor={(item)=>(item._id)}
          renderItem={({item})=>(
            <View style={tw`flex m-2 bg-white w-4/5 rounded-lg ml-10`}>
              <TouchableOpacity>
                <View style={tw`mx-auto`}>
                  <View style={tw`w-full mx-auto mt-4`}>
                    <Image
                      source={{
                        uri:item.media.length > 0 ? item.media : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      }}
                      style={{ width: 260, height: 200, margin:"auto" }}
                    />
                  </View>
                  <Text style={tw`text-center font-bold text-xl text-black`}>{item.topic}</Text>
                  <Text style={tw`text-center font-bold mt-2 text-blue-800`}>
                    {item.title}
                  </Text>
                  <Text style={tw`text-right mt-2 mr-2 font-bold text-black`}>
                    {item.published_date}
                  </Text>
                </View>          
              </TouchableOpacity>
            </View>
          )}
        />
      
      </View>
    </View>
    
  )
}

export default HomeScreen