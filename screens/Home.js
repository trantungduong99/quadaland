import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {SIZES, COLORS, icons, FONTS} from '../constants';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginHorizontal: SIZES.padding}}>
        <View style={{height: 0.05* SIZES.height}}>
          <View style={{flex: 1,justifyContent:"center"}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>

                <TouchableOpacity style={{ width: '85%'}} onPress={()=>{navigation.navigate("Search")}}>
                <View
                  style={{
                    flexDirection:"row",
                    backgroundColor: '#C8CACE',
                    borderRadius:50,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}>
                  <Image source={icons.search} resizeMode="contain" style={{height:0.03*SIZES.height,width:0.03*SIZES.height,marginTop:0.01*SIZES.height,marginBottom:0.01*SIZES.height,marginLeft:15,marginRight:15}}/>
                  <Text style={{color:COLORS.black,...FONTS.body4}}>Tìm kiếm...</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 0.05*SIZES.height}} onPress={()=>{navigation.navigate("Map")}}>
                <View
                  style={{
                    backgroundColor: 'blue',
                    borderRadius:50,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Image source={icons.map} resizeMode="contain" style={{height:0.03*SIZES.height,width:0.03*SIZES.height,margin:0.01*SIZES.height,tintColor:COLORS.white}}/>
                </View>
                </TouchableOpacity>


              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1,paddingVertical:SIZES.padding},
});
