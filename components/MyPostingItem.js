import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {SIZES, FONTS, COLORS, icons} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';
import {deleteProperty} from '../services/authService';
const MyPostingItem = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useAuthDispatch();
  const {username} = useAuthState();
  const handleDetete = async (slug) => {
    // console.log(slug);
    deleteProperty(slug).then((r) => {
      // console.log(r);
    }).catch((e)=>{
      // console.log(e);
    });
  };
  return (
    <View>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 320,
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
              navigation.navigate('PropertyDetail', {item: item});
            }}>
            <Image
              source={{uri: 'https://random.imagecdn.app/1200/800'}}
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
                  {item.details.price}triệu
                </Text>
                <Text
                  style={{color: COLORS.primary, ...FONTS.body5}}
                  numberOfLines={1}>
                  {item.details.area}m²
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
                console.log('Save on Pressed');
              }}>
              <Image
                source={icons.save_outline}
                resizeMode="contain"
                style={{width: 27, height: 27, tintColor: COLORS.primary}}
              />
            </TouchableOpacity>
            {item.company.user == username ? (
              <TouchableOpacity
                style={{position: 'absolute', top: 12, right: 12}}
                onPress={() => {
                  handleDetete(item.slug);
                }}>
                <Image
                  source={icons.delete_icon}
                  resizeMode="contain"
                  style={{width: 27, height: 27, tintColor: COLORS.black}}
                />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default MyPostingItem;
