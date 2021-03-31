import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dummyProjectData} from '../data/Data';
import {SIZES,icons,COLORS} from '../constants';

const RentDetail = ({route}) => {
  const navigation = useNavigation()
  const project = route.params.item;
  return (
    <View style={{flex: 1}}>
      <View style={{height: '30%', backgroundColor: 'red'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            horizontal
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEnabled
            scrollEventThrottle={16}
            decelerationRate={"fast"}
            snapToAlignment="center"
            data={dummyProjectData}
            keyExtractor={(item) => 'DetailImages' + item.id}
            renderItem={({item}) => {
              return (
                  <Image
                    source={item.img}
                    resizeMode="cover"
                    style={{height: '100%', width: SIZES.width}}
                  />
              );
            }}
          />
        </View>
      <View style={{position:"absolute",flexDirection:"row",justifyContent:"space-between",width:SIZES.width,padding:SIZES.padding}}>
      <TouchableOpacity style={{width: 0.03 * SIZES.height}} onPress={()=>{navigation.goBack()}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 0.03 * SIZES.height}} onPress={()=>{console.log("MoreAction in RentDetail on Pressed")}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.more}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
      </View>
      </View>
      
    </View>
  );
};

export default RentDetail;
