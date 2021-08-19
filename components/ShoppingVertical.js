import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {SIZES, FONTS, COLORS, icons,API} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {media} from '../data/Data';
const ShoppingVertical = ({item}) => {
  const navigation = useNavigation();
  const {details, deleted_at} = item;
  const slug = item.details.media.length>0?item.details.media[0].slug:media[0].slug
  return (
    <View>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 330,
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
            disabled={deleted_at ? true : false}
            onPress={() => {
              navigation.navigate('PropertyDetail', {item: item});
            }}>
            <Image
              source={{uri: API.CREATE_MEDIA_URL+"/"+slug ,}}
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.primary, ...FONTS.body5}}>
                  {item.details.price
                    ? parseFloat(item.details.price) < 1000
                      ? item.details.price + 'triệu'
                      : (parseFloat(item.details.price) / 1000).toString() +
                        'tỷ'
                    : 'Đang cập nhật...'}
                </Text>
                <Text
                  style={{color: COLORS.primary, ...FONTS.body5}}
                  numberOfLines={1}>
                  {item.details.area?item.details.area+"m²":"Đang cập nhật..."}
                </Text>
              </View>
              <Text
                style={{color: COLORS.black, ...FONTS.h4}}
                numberOfLines={2}>
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
                backgroundColor:
                  item.approval_status == true ? '#0D9B06' : '#D86519',
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
                {item.approval_status == true ? 'Đang mở bán' : 'Sắp mở bán'}
              </Text>
            </View>
            <TouchableOpacity
              style={{position: 'absolute', bottom: 12, left: 24}}
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
              style={{position: 'absolute', bottom: 12, right: 24}}
              onPress={() => {
                // console.log(item.id);
              }}>
              <Image
                source={icons.save_outline}
                resizeMode="contain"
                style={{width: 27, height: 27, tintColor: COLORS.primary}}
              />
            </TouchableOpacity>
            {deleted_at && (
              <View
                style={{
                  top: 0,
                  right: 0,
                  position: 'absolute',
                  height: 330,
                  width: '100%',
                  borderRadius: 10,
                  backgroundColor: '#CCCCCC',
                  opacity: 0.8,
                }}></View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ShoppingVertical;
