import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {SIZES, FONTS, COLORS, icons} from '../constants';
const ProjectVertival = ({item}) => {
  return (
    <View>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 250,
            marginBottom: SIZES.padding,
            marginHorizontal: SIZES.padding,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              shadowColor: '#00000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 2.62,
              elevation: 3,
            }}
            onPress={() => {
              console.log('project' + item.id);
            }}
            S>
            <Image
              source={item.img}
              style={{
                width: SIZES.width - 2 * SIZES.padding,
                height: '100%',
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: '50%',
                backgroundColor: '#FAFAFA',
                width: SIZES.width - 2 * SIZES.padding,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: SIZES.padding,
              }}>
              <Text
                style={{color: COLORS.black, ...FONTS.h4}}
                numberOfLines={1}>
                {item.projectName}
              </Text>
              <Text
                style={{color: COLORS.black, ...FONTS.body4}}
                numberOfLines={2}>
                {item.projectAddress}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: item.status == 1 ? '#0D9B06' : '#D86519',
                padding: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:10
              }}>
                <Text style={{color: COLORS.white, ...FONTS.body4,marginHorizontal:2}}>
              {item.status == 1 ? 'Đang mở bán' : 'Sắp mở bán'}
            </Text>
              </View>
          <TouchableOpacity style={{position:"absolute",bottom:12,left:24}} onPress={()=>{console.log("Favorite on Pressed")}}>
              <Image source={icons.heart_outline} resizeMode="contain" style={{width:27,height:27,tintColor:COLORS.primary}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{position:"absolute",bottom:12,right:24}} onPress={()=>{console.log("Save on Pressed")}}>
              <Image source={icons.save_outline} resizeMode="contain" style={{width:27,height:27,tintColor:COLORS.primary}}/>
          </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ProjectVertival;
