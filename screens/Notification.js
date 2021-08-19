import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {getOneProperty} from '../services/authService';
import {IS_RECEIVE_NOTI, VIEWNOTI} from '../actions/actionTypes';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';
import {COLORS} from '../constants';
const Notification = ({navigation}) => {
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const {noti} = useAuthState();
  useEffect(() => {
    dispatch({
      type: VIEWNOTI,
      isReceiveNoti: false,
    });
  }, []);
  return (
    <View style={{flex: 1, paddingHorizontal: 12, paddingTop: 30}}>
      {noti === '' ? (
        <Text>Không có thông báo mới</Text>
      ) : (
        <TouchableOpacity
          style={{
            height: 100,
            borderRadius: 10,
            backgroundColor: '#D8D8D8',
          }}
          onPress={() => {
            setLoading(true);
            getOneProperty(noti)
              .then((r) => {
                dispatch({
                  type: IS_RECEIVE_NOTI,
                  isReceiveNoti: false,
                  noti: '',
                });
                setLoading(false);
                navigation.navigate('PropertyDetail', {item: r.data});
              })
              .catch((e) => {
                console.log(e);
              });
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Bài viết của bạn đã được duyệt. Xem chi tiết </Text>
            {loading && <Text>Loading...</Text>}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Notification;
