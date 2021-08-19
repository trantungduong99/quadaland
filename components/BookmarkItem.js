import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, SIZES, icons, API} from '../constants';
import {media} from '../data/Data';
require('moment/locale/vi');
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
const BookmarkItem = ({item}) => {
  // console.log(item.property.details.media);
  moment.locale('vi');
  const slug =
    item.property.details.media.length > 0 ? item.property.details.media[0].slug : media[0].slug;
  return (
    <View>
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.base,
        }}>
        <View style={{height: 100, flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}>
            <Image
              source={{
                uri: API.CREATE_MEDIA_URL + '/' + slug,
              }}
              resizeMode="cover"
              style={{height: 100, width: 100, borderRadius: 10}}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: SIZES.base,
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{color: COLORS.black, ...FONTS.h4}}
                numberOfLines={2}>
                {item.property.details.title}
              </Text>
            </View>
            <View style={{flex: 0.5, flexDirection: 'row'}}>
              <Text
                style={{
                  marginRight: SIZES.base,
                  ...FONTS.body4,
                  color: COLORS.primary,
                }}>
                {item.property.sale_method === 'for_sale'
                  ? 'Mua bán'
                  : 'Cho thuê'}
              </Text>
              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                {item.property.company.full_name}
              </Text>
            </View>
            <View
              style={{flex: 0.5, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.dot}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: '#2E64FE',
                  marginRight: SIZES.base,
                }}
              />
              <View>
                <Text>Đã lưu </Text>
              </View>
              <TimeAgo time={item.created_at} />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={icons.more}
                style={{width: 18, height: 18, tintColor: COLORS.secondary}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default BookmarkItem;
