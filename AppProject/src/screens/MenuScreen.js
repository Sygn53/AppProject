import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions, FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Carousel } from "react-native-snap-carousel-v4";

const screenWidth = Dimensions.get('window').width;
const MenuScreen = () => {
  const carouselRef = useRef(null);
  const flatListRef = useRef(null);
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      const json = await response.json();
      setData(json.menuScreens);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFetchApi();
    // console.warn("data: " ,data);
  }, []);

  const renderItemFlatlistMenu = ({item}) => {
    return (
      <View style={{ padding: 20}}>
        <FastImage source={{uri: item.imageUrl}}
                   style={{aspectRatio: 0.8 , width: 140, borderRadius: 30}}/>
        <Text style={{alignSelf: 'center', padding: 4, fontSize: 18}}>{item.text}</Text>
      </View>
    )
  }

  const flatlistMenu = () => {
    return (
      <View>
        <FlatList data={data?.flatListItems}
                  renderItem={renderItemFlatlistMenu}
                  numColumns={2}
                  contentContainerStyle={{alignSelf: 'center', width: screenWidth - 40, height: 800}}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  // numColumns={2}
        />
      </View>
    );
  }

  const renderItemFlatlist = ({index}) => {
    const color = currentIndex === index ? '#000000' : '#DEDEDE';
    // if (++index < 10) {
    //   index = '0' + index;
    // }
    return (
      <TouchableWithoutFeedback onPress={() => {
        flatListRef?.current?.scrollToIndex({
          index: index,
          animated: true,
        });
        setCurrentIndex(index);
        carouselRef.current.snapToItem(index);
      }}>
        <View style={{padding: 10}}>
          <View style={{        width: 18,
            height: 12,
            borderWidth: 1,
            borderColor: color,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{
              width: 10,
              height: 6,
              borderRadius: 6,
              backgroundColor: color,
              alignSelf:'center',
            }}>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

    );
  };
  const renderPagination = (currentIndex: number, totalItem: number) => {
    if (totalItem < 1) {
      totalItem = 1;
    }
    return (
      <FlatList
        ref={flatListRef}
        data={[...Array(totalItem).keys()]}
        horizontal
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItemFlatlist}
      />
    );
  };

  const renderItemCarousel = ({item}) => {
    return (
      <View>
        <FastImage source={{uri: item.imageUrl}} style={{aspectRatio: 1, borderRadius: 20, alignItems:'center', justifyContent: 'flex-end'}}>
          {/*<Text style={{color: 'black', fontSize: 24, fontWeight: 'bold', marginBottom: 30}}>{item.type}</Text>*/}
        </FastImage>
      </View>
        );
  }

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}} >
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{alignItems: 'center'}}>
          <FastImage source={{ uri: data.menuImage}}
                      style={{ width: 120, aspectRatio: 1.25, marginTop: 40}}/>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20}}>{data.title}</Text>
          <Text style={{ fontSize: 20, marginTop: 10}}>{data.desp}</Text>
          <Carousel
            ref={carouselRef}
            keyExtractor={(item, index) => index}
            contentContainerCustomStyle={{marginTop: 20, marginLeft: 30}}
            decelerationRate={0.5}
            data={data?.items}
            renderItem={renderItemCarousel}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 80}
            //inactiveSlideScale={1}
            //inactiveSlideOpacity={1}
            activeSlideAlignment={'start'}
            useExperimentalSnap={true}
            layout={'stack'}
            enableSnap={true}
            shouldOptimizeUpdates
            disableIntervalMomentum={true}
            onSnapToItem={index => setCurrentIndex(index)}
          />

        </View>
        <View style={{paddingLeft: 10, paddingVertical: 5}}>
          {renderPagination(currentIndex, data?.items?.length)}
        </View>
        {flatlistMenu()}
      </ScrollView>

    </SafeAreaView>
  );
}

export default MenuScreen;
