import React, { useState } from "react";
import { Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ProfileScreen = () => {
  return (
    <View>
      <FastImage source={{uri: 'https://wallpaperaccess.com/full/372967.jpg'}}
                 style={{width: screenWidth, height: screenHeight, alignItems:'center'}}
                 resizeMode={'stretch'}>
        <View style={{backgroundColor: 'pink', opacity: 0.7, width: screenWidth - 80, height: screenHeight / 1.6,
          marginTop: 60, shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,}}>

        </View>
      </FastImage>
    </View>
  )
}

export default ProfileScreen;
