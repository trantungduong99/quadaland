import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import MapView, {Circle, Marker, Polygon} from 'react-native-maps';
import {COLORS, SIZES, icons, images, FONTS} from '../constants';
import Geolocation from '@react-native-community/geolocation';
import {SET_COORDINATE} from '../actions/actionTypes';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';

const Coordinate = ({navigation, route}) => {
  const latlngDelta = {latitudeDelta: 0.00922, longitudeDelta: 0.00421};
  const [error, setError] = useState(null);
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
  const {coordinate} = useAuthState();
  console.log(route.params.option);
  useEffect(() => {
    if (route.params.option === 'update') {
      setCoordinateCreate(coordinate);
      setCurrentCoordinate(coordinate);
      setError(false);
    } else {
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
    }
  }, []);
  const onMapPress = async (e) => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setIsChange(true);
    console.log({latitude, longitude});
    setCoordinateCreate({latitude, longitude});
  };
  const focusCurrentPosition = () => {
    setCoordinateCreate(currentCoordinate);
  };
  const handleCreateCoordinate = () => {
    dispatch({type: SET_COORDINATE, coordinate: coordinateCreate});
    if (route.params.option === 'update') {
      navigation.navigate('EditProperty');
    } else {
      navigation.navigate('CreateProperty');
    }
    console.log('coordinate sau: ', coordinateCreate);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          ...currentCoordinate,
          ...latlngDelta,
        }}
        onPress={(e) => {
          onMapPress(e);
        }}>
        <Circle
          center={coordinateCreate}
          radius={200}
          fillColor="rgba(255,106,106,0.2)"
        />
        <MapView.Marker coordinate={coordinateCreate} />
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
              source={icons.right_turn}
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
});
export default Coordinate;
