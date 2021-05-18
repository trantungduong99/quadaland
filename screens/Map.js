import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import MapView, {Circle, Marker, Polygon} from 'react-native-maps';
import {COLORS, SIZES, icons, images, FONTS} from '../constants';
import Geolocation from '@react-native-community/geolocation';
import {SET_COORDINATE, GET_PROP_BYCOOR} from '../actions/actionTypes';
import {getPropertyByCoordinate} from '../services/authService';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';
import Slider from '@react-native-community/slider';

const Map = ({navigation}) => {
  const {searchList} = useAuthState();
  const latlngDelta = {latitudeDelta: 0.02922, longitudeDelta: 0.02421};
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [radius, setRadius] = useState(1);
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
    console.log({latitude, longitude});
  };
  const focusCurrentPosition = () => {
    setCoordinateCreate(currentCoordinate);
  };
  const handleCreateCoordinate = () => {
    setIsLoading(true);
    console.log('coordinate sau: ', coordinateCreate);
    console.log('đi gửi thông tin tìm kiếm cho server');
    getPropertyByCoordinate(coordinateCreate, radius)
      .then((r) => {
        console.log("datasearch",r.data);
        setIsLoading(false);
        dispatch({type: GET_PROP_BYCOOR, searchList: r.data});
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const gotoDetail = (property) => {
    console.log(property);
    if(property.sale_method==='for_sale'){
      navigation.navigate('ShoppingDetail', {item: property});
    }else{
     navigation.navigate('RentDetail',{item:property})
    }
   
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
        <Circle
          center={coordinateCreate}
          radius={radius * 1000}
          fillColor="rgba(255,106,106,0.2)"
        />

        <MapView.Marker coordinate={coordinateCreate} />
        {searchList.map((o, i) => (
          <MapView.Marker
            image={icons.marker}
            key={i}
            onPress={() => {
              gotoDetail(o);
            }}
            coordinate={{
              latitude: parseFloat(o.details.coordinate.latitude),
              longitude: parseFloat(o.details.coordinate.longitude),
            }}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.button_focus}
        onPress={() => {
          focusCurrentPosition();
        }}>
        <Image
          source={icons.focus}
          style={styles.icon_focus}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          style={styles.button_search}
          onPress={() => {
            handleCreateCoordinate();
          }}>
          <Image
            source={icons.search}
            style={styles.icon_search}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.slider_container}>
        <View style={styles.slider_button}>
          <Slider
            style={{width: '60%'}}
            minimumValue={1}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="black"
            maximumTrackTintColor="#000"
            thumbTintColor="black"
            onValueChange={(val) => {
              setRadius(val);
            }}
          />
          <Text style={{color: 'black'}}>{radius}km</Text>
        </View>
      </View>
      {isLoading && (
        <View style={styles.loading}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>
            Đang tìm kiếm...
          </Text>
        </View>
      )}
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
  button_focus: {
    position: 'absolute',
    bottom: 164,
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
  },
  button_search: {
    position: 'absolute',
    bottom: 92,
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
  },
  icon_focus: {width: 25, height: 25, tintColor: '#1a73e9'},
  icon_search: {width: 25, height: 25, tintColor: COLORS.white},
  slider_container: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    alignItems: 'center',
    padding: SIZES.padding,
  },
  slider_button: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(28, 116, 233, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    borderRadius: 30,
    flexDirection: 'row',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    bottom: SIZES.height / 2,
    alignItems: 'center',
    padding: SIZES.padding,
  },
});
export default Map;
