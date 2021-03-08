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
  FlatList,
} from 'react-native';
import {SIZES, COLORS, icons, FONTS, images} from '../constants';

const Home = ({navigation}) => {

  // Dummy Data
  const [introImages,setIntroImages] = React.useState([
    {id:0,img:images.real_estate},
    {id:0,img:images.real_estate}
  ])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginHorizontal: SIZES.padding}} showsVerticalScrollIndicator={false}>
   
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
                    backgroundColor: '#0099CC',
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

       
        <View style={{height:0.20*SIZES.height,backgroundColor:"red"}}>
          <View style={{flex:1,justifyContent:"center"}}>
            <View>
              {/* <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={introImages}
                keyExtractor={(item)=> 'key'+item.id}
                pagingEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
              ></FlatList> */}
            </View>
          </View>
        </View>
        <View style={{height:0.31*SIZES.height,backgroundColor:"blue"}}></View>
        <View style={{height:0.35*SIZES.height,backgroundColor:"green"}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1,paddingVertical:SIZES.padding},
});
