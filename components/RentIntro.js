import React, {useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import {images, icons, SIZES, FONTS, COLORS} from '../constants';
import RentIntroItem from './RentIntroItem';
import {useNavigation} from '@react-navigation/native';
import {GET_SUB_RENT} from '../actions/actionTypes';
import {getProperty} from '../services/authService';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';
const RentIntro = () => {
  const dispatch = useAuthDispatch();
  const {subRentArray, userToken} = useAuthState();
  useEffect(() => {
    const query = {
      sale_method: 'for_rent',
      sort_by: '-created_at',
      per_page: 10,
      page: 1,
    };

    getProperty(query)
      .then((r) => {
        if (r.status === 200) {
          const subRentArray = r.data.result;
          dispatch({type: GET_SUB_RENT, subRentArray: subRentArray});
        } else {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: SIZES.font}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: COLORS.black, ...FONTS.h2}}>Cho thuê</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              navigation.navigate('Rent');
            }}>
            <Text style={{color: COLORS.primary, ...FONTS.body4}}>
              Xem tất cả
            </Text>
            <Image
              source={icons.right_arrow}
              style={{
                height: 18,
                width: 18,
                tintColor: COLORS.primary,
                marginLeft: SIZES.base,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, marginTop: SIZES.base, height: '100%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={subRentArray}
            keyExtractor={(item) => 'keySubRent' + item.slug}
            renderItem={({item}) => {
              return <RentIntroItem item={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RentIntro;
