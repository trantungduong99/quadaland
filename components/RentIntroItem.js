import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {SIZES, FONTS, COLORS, icons, images, API} from '../constants';
import {media} from '../data/Data';
import {useNavigation} from '@react-navigation/native';
import { createBookmark } from '../services/authService';
const RentIntroItem = ({item}) => {
  const navigation = useNavigation();
  const [save,setSave] = useState(false)
  const slug =
    item.details.media.length > 0 ? item.details.media[0].slug : media[0].slug;
  // console.log(slug);
  const handleSavePost= async ()=>{
    setSave(true)
    console.log(item.id);
    await createBookmark(item.id)
  }
  return (
    <View style={{marginRight: SIZES.padding, marginLeft: 1}}>
      <View style={{flex: 1}}>
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
            navigation.navigate('PropertyDetail', {item: item});
          }}>
          <Image
            source={{
              uri: API.CREATE_MEDIA_URL + '/' + slug,
            }}
            style={{width: SIZES.width * 0.8, height: '97%', borderRadius: 10}}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: '50%',
              width: SIZES.width * 0.8,
              backgroundColor: '#FAFAFA',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: SIZES.padding,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.primary, ...FONTS.body5}}>
                {item.details.price
                  ? parseFloat(item.details.price) < 1000
                    ? item.details.price + ' triệu'
                    : (parseFloat(item.details.price) / 1000).toString() + ' tỷ'
                  : 'Đang cập nhật...'}
              </Text>
              <Text
                style={{color: COLORS.primary, ...FONTS.body5}}
                numberOfLines={1}>
                {item.details.area
                  ? item.details.area + ' m²'
                  : 'Đang cập nhật...'}
              </Text>
            </View>
            <Text style={{color: COLORS.black, ...FONTS.h4}} numberOfLines={1}>
              {item.details.title}
            </Text>
            <Text
              style={{color: COLORS.black, ...FONTS.body4}}
              numberOfLines={2}>
              {item.details.address}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: '#D86519',
              padding: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
                marginHorizontal: 2,
              }}>
              Hot
            </Text>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', bottom: 12, left: 12}}
            onPress={() => {
              console.log('Favorite on Pressed');
            }}>
            <Image
              source={icons.heart_outline}
              resizeMode="contain"
              style={{width: 27, height: 27, tintColor: COLORS.primary}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{position: 'absolute', bottom: 12, right: 12}}
            onPress={() => {
              handleSavePost()
            }}>
            <Image
              source={save?icons.save:icons.save_outline}
              resizeMode="contain"
              style={{width: 27, height: 27, tintColor: COLORS.primary}}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RentIntroItem;
