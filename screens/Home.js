import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {SIZES, COLORS, icons, FONTS, images} from '../constants';
import {
  Carousel,
  Menu,
  ProductIntro,
  RentIntro,
  ShoppingIntro,
} from '../components';
import {dummyImageData} from '../data/Data';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';
import asyncStorage from '@react-native-community/async-storage';
import Pusher from 'pusher-js';
import {getOneProperty} from '../services/authService';
import {GET_USERNAME, IS_RECEIVE_NOTI} from '../actions/actionTypes';
const Home = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  const {userToken, username} = useAuthState();
  const dispatch = useAuthDispatch();
  const createTwoButtonAlert = (data) => {
    dispatch({
      type: IS_RECEIVE_NOTI,
      isReceiveNoti: true,
      noti: data.target_id,
    });
    // Alert.alert('Thông báo', 'Bài viết của bạn đã được duyệt', [
    //   {
    //     text: 'Tắt',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'Xem chi tiết',
    //     style: 'default',
    //     onPress: () => {
    //       getOneProperty(data.target_id)
    //         .then((r) => {
    //           navigation.navigate('PropertyDetail', {item: r.data});
    //         })
    //         .catch((e) => {
    //           console.log(e);
    //         });
    //     },
    //   },
    // ]);
  };
  useEffect(() => {
    asyncStorage
      .getItem('username')
      .then((r) => {
        dispatch({type: GET_USERNAME, username: r});
        if (username !== '') {
          const pusher = new Pusher('31228d6611e35745a3c9', {
            cluster: 'ap1',
            authEndpoint: 'http://123.19.51.38:3000/api/v1/pusher/auth',
            auth: {
              headers: {Authorization: `Bearer ${userToken}`},
            },
          });
          const channel = pusher.subscribe(`private-user-${username}`);
          channel.bind('property-approved', (data) => {
            // console.log(data);
            createTwoButtonAlert(data);
          });
          if (pusher.connection.state !== 'connected') {
            console.log('connect');
            const channel = pusher.subscribe(`private-user-${username}`);
            channel.bind('property-approved', (data) => {
              // console.log(data);
              createTwoButtonAlert(data);
            });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log(username);
    const pusher = new Pusher('31228d6611e35745a3c9', {
      cluster: 'ap1',
      authEndpoint: 'http://123.19.51.38:2999/api/v1/pusher/auth',
      auth: {
        headers: {Authorization: `Bearer ${userToken}`},
      },
    });
    if (pusher.connection.state !== 'connected') {
      console.log('connect');
      const channel = pusher.subscribe(`private-user-${username}`);
      channel.bind('property-approved', (data) => {
        // console.log(data);
        createTwoButtonAlert(data);
      });
    }
  }, [username]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{marginHorizontal: SIZES.padding}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setRefresh(false);
            }}
          />
        }>
        <View style={{height: 0.05 * SIZES.height}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{width: '85%'}}
                  onPress={() => {
                    navigation.navigate('Search', {searchOption: 'for_sale'});
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#C8CACE',
                      borderRadius: 50,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={icons.search}
                      resizeMode="contain"
                      style={{
                        height: 0.03 * SIZES.height,
                        width: 0.03 * SIZES.height,
                        marginTop: 0.01 * SIZES.height,
                        marginBottom: 0.01 * SIZES.height,
                        marginLeft: 15,
                        marginRight: 15,
                      }}
                    />
                    <Text style={{color: COLORS.black, ...FONTS.body4}}>
                      Tìm kiếm...
                    </Text>
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
                      borderRadius: 50,
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
        </View>

        <View style={{height: 0.23 * SIZES.height}}>
          <View style={{flex: 1, marginVertical: SIZES.base}}>
            <Carousel data={dummyImageData} />
          </View>
        </View>
        <View style={{height: 0.26 * SIZES.height}}>
          <Menu />
        </View>
        <View style={{height: 0.45 * SIZES.height}}>
          <ShoppingIntro />
        </View>
        <View style={{height: 0.45 * SIZES.height}}>
          <RentIntro />
        </View>
        <View style={{height: 0.4 * SIZES.height}}>
          <ProductIntro />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: SIZES.padding},
});
