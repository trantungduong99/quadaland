import React from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import RentVertical from '../components/RentVertical';
import {icons, SIZES, COLORS} from '../constants';
import {dummyRentData} from '../data/Data';

const Rent = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{height: 0.05 * SIZES.height, marginTop: SIZES.padding}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{width: 0.03 * SIZES.height}}
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    tintColor: COLORS.secondary,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '75%'}}
              onPress={() => {
                console.log('click vao input');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '#C8CACE',
                  borderRadius: 0.05 * SIZES.height,
                  height: 0.05 * SIZES.height,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 0.06 * SIZES.height,
                    height: 0.05 * SIZES.height,
                    borderTopLeftRadius: 0.05 * SIZES.height,
                    borderBottomLeftRadius: 0.05 * SIZES.height,
                    backgroundColor: '#6BC4FC',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                      height: 30,
                      backgroundColor: "#def",
                      borderRadius: 10,
                      padding: 5,
                    }}>
                    <Image
                      source={icons.rent}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text>Tìm kiếm ...</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: 0.05 * SIZES.height}}
              onPress={() => {
                navigation.navigate('Map');
              }}>
              <View
                style={{
                  backgroundColor: '#0099CC',
                  borderRadius: 0.05 * SIZES.height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.map}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    margin: 0.01 * SIZES.height,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex:1}}>
          <View style={{flex:1}}>
              <View style={{flex:1,marginTop:SIZES.padding}}>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                  <FlatList
                  data={dummyRentData}
                  keyExtractor={(item)=>{return("RentID"+item.id.toString())}}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item})=>{return(<RentVertical item={item}/>)}}
                  />
                </View>
              </View>
          </View>
      </View>
    </View>
  );
};

export default Rent;
