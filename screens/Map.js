import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import MapView, {Circle, Marker, Polygon} from 'react-native-maps';
import {COLORS, SIZES, icons, images, FONTS} from '../constants';
import Geolocation from '@react-native-community/geolocation';
import {SET_COORDINATE, GET_PROP_BYCOOR} from '../actions/actionTypes';
import {getPropertyByCoordinate} from '../services/authService';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';

const Map = ({navigation}) => {
  const {searchList} = useAuthState();
  const latlngDelta = {latitudeDelta: 0.00922, longitudeDelta: 0.00421};
  const [error, setError] = useState(null);
  const [circleVisible, setCircleVisible] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [coordinateCreate, setCoordinateCreate] = useState({
    latitude: 16.066627,
    longitude: 108.151134,
  });
  const [currentCoordinate, setCurrentCoordinate] = useState({
    latitude: 16.066627,
    longitude: 108.151134,
  });
  const dispatch = useAuthDispatch();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoordinateCreate(position.coords);
        setCurrentCoordinate(position.coords);
        setError(false);
      },
      (error) => {
        setError(error.message);
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 2000},
    );
  }, []);
  useEffect(() => {
    return () => {
      dispatch({type: GET_PROP_BYCOOR, searchList: []});
    };
  }, []);
  const onMapPress = (e) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setCoordinateCreate({latitude, longitude});
    setIsChange(true);
    console.log({latitude, longitude});
  };
  const focusCurrentPosition = () => {
    setCoordinateCreate(currentCoordinate);
  };
  const handleCreateCoordinate = () => {
    // // navigation.navigate('Posting');
    // dispatch({type: SET_COORDINATE, coordinate: coordinateCreate});
    console.log('coordinate sau: ', coordinateCreate);
    console.log('đi gửi thông tin tìm kiếm cho server');
    getPropertyByCoordinate(coordinateCreate, 10)
      .then((r) => {
        console.log(r.data);
        setCircleVisible(true);
        dispatch({type: GET_PROP_BYCOOR, searchList: r.data});
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <TouchableOpacity
          style={styles.button_back}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={icons.back}
            style={styles.button_back}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text_title}>Bản đồ</Text>
      </View>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          ...currentCoordinate,
          ...latlngDelta,
        }}
        onPress={(e) => {
          onMapPress(e);
        }}>
        {circleVisible && (
          <Circle
            center={coordinateCreate}
            radius={10000}
            fillColor="rgba(255,106,106,0.2)"
          />
        )}
        <MapView.Marker coordinate={coordinateCreate} />
        {searchList.map((o, i) => (
          <MapView.Marker
            image={icons.marker}
            key={i}
            coordinate={{
              latitude: parseFloat(o.details.coordinate.latitude),
              longitude: parseFloat(o.details.coordinate.longitude),
            }}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 200,
          right: 12,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}
        onPress={() => {
          focusCurrentPosition();
        }}>
        <Image
          source={icons.focus}
          style={{width: 25, height: 25, tintColor: '#1a73e9'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {isChange ? (
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 128,
              right: 12,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#1a73e9',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
            onPress={() => {
              handleCreateCoordinate();
            }}>
            <Image
              source={icons.search}
              style={{width: 25, height: 25, tintColor: COLORS.white}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  header_container: {
    alignItems: 'center',
    height: 50,
    borderBottomColor: COLORS.darkgray,
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
  },
  button_back: {height: 22, width: 22},
  text_title: {
    color: COLORS.black,
    ...FONTS.body2,
    marginLeft: 2 * SIZES.padding,
  },
});
export default Map;
