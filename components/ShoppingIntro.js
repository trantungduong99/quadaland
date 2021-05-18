import React, {useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import {images, icons, SIZES, FONTS, COLORS} from '../constants';
import {dummmyShoppingData} from '../data/Data';
import ShoppingItem from './ShoppingItem';
import {useNavigation} from '@react-navigation/native';
import {getProperty} from '../services/authService';
import {useAuthState, useAuthDispatch} from '../contexts/authContext';
import {GET_SUB_SALE} from '../actions/actionTypes';

const ShoppingIntro = () => {
  const dispatch = useAuthDispatch();
  const {subSaleArray} = useAuthState();
  useEffect(() => {
    const query = {
      sale_method: 'for_sale',
      sort_by: '-created_at',
      per_page: 10,
      page: 1,
    };
    getProperty(query)
      .then((r) => {
        if (r.status === 200) {
          const subSaleArray = r.data.result;
          dispatch({type: GET_SUB_SALE, subSaleArray: subSaleArray});
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
          <Text style={{color: COLORS.black, ...FONTS.h2}}>Mua bán</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              navigation.navigate('Shopping');
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
            data={subSaleArray}
            keyExtractor={(item) => 'keySubSale' + item.slug}
            renderItem={({item}) => {
              return <ShoppingItem item={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ShoppingIntro;
