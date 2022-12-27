import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const LoginScreen = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const getFetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      const json = await response.json();
      setData(json.users);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFetchApi();
    // console.warn("data: " ,data);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20}}>
      <View style={{}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 40, marginHorizontal: 40, height: 200, borderWidth: 1, borderRadius: 40, backgroundColor: '#1414b0'}}>
          <TouchableOpacity onPress={() => setPage(0)}>
            <Text style={{padding: 10, fontSize: 16, fontWeight: 'bold', color: 'white'}}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPage(1)}>
            <Text style={{padding: 10, fontSize: 16, fontWeight: 'bold', color: 'white'}}>Kaydol</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: -160}}>
          <FastImage source={{uri: 'https://i.pinimg.com/236x/26/3d/53/263d53ed14ea33255b11d342a25c20d4.jpg'}}
                     style={{ height: screenHeight - 260, alignItems: 'center', borderTopRightRadius: 40, borderTopLeftRadius: 40}}
                     resizeMode={'stretch'}>
            {page == 0 ? signIn() : signUp()}
          </FastImage>
        </View>
      </View>
    </SafeAreaView>
  );

  function signIn() {
    return (
      <View style={{alignItems: 'center'}}>
        <TextInput style={{width: 180, height: 40, marginTop: 180, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4}}
                   placeholder={'Username - Email'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TextInput style={{width: 180, height: 40, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4, marginTop: 20}}
                   placeholder={'Password'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TouchableOpacity style={{backgroundColor: '#1414b0', marginTop: 40, borderRadius: 40}}>
          <Text style={{padding: 16, fontSize: 20, fontWeight: 'bold', color: 'white'}}>GİRİŞ</Text>
        </TouchableOpacity>
        <Text style={{flexWrap: 'wrap', width: 180, fontSize: 16, marginTop: 40, color: 'white'}}>Hesabınız yoksa hemen hesap oluşturunuz.</Text>
      </View>
    );
  }

  function signUp() {
    return (
      <View style={{alignItems: 'center'}}>
        <TextInput style={{width: 180, height: 40, marginTop: 140, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4}}
                   placeholder={'Adınız'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TextInput style={{width: 180, height: 40, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4, marginTop: 20}}
                   placeholder={'Soyadınız'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TextInput style={{width: 180, height: 40, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4, marginTop: 20}}
                   placeholder={'Username'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TextInput style={{width: 180, height: 40, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4, marginTop: 20}}
                   placeholder={'Email'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TextInput style={{width: 180, height: 40, borderBottomWidth: 1, color: 'white', borderColor:'white', fontSize: 18, marginLeft: 4, marginTop: 20}}
                   placeholder={'Password'}
                   placeholderTextColor={'#c7c7c7'}>
        </TextInput>
        <TouchableOpacity style={{backgroundColor: '#1414b0', marginTop: 20, borderRadius: 40}}>
          <Text style={{padding: 16, fontSize: 20, fontWeight: 'bold', color: 'white'}}>KAYDOL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;
