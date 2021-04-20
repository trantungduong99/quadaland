import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import MapView, {Circle, Marker, Polygon} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      markers: [],
    };
  }
  onMapPress(e) {
    this.setState({
      markers: [...this.state.markers, {latlng: e.nativeEvent.coordinate}],
    },()=>{console.log(this.state.markers)});
    
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        return this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        this.setState({error: error.message});
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 16.066627,
            longitude: 108.151134,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          onPress={this.onMapPress.bind(this)}>
          <Marker coordinate={this.state} />
          <Circle
            center={this.state}
            radius={200}
            fillColor="rgba(255,106,106,0.2)"
          />
          {this.state.markers.map((marker,i)=>(<MapView.Marker key={i} coordinate={marker.latlng}/>))}
        </MapView>
      </View>
    );
  }
}

export default Map;
