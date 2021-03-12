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
import Menu from '../components/Menu';


const Home = ({navigation}) => {

  // Dummy Data
  const [introImages,setIntroImages] = React.useState([
    {id:0,img:images.banner1},
    {id:1,img:images.banner2},
    {id:2,img:images.banner3},
    {id:3,img:images.banner4},
    {id:4,img:images.banner5},
    {id:5,img:images.banner6},
  ])
 
  function renderBanner(item, index){
    return(
     <View style={{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Image source={item.img} resizeMode="cover" style={{width:SIZES.width-2*SIZES.padding,height:"100%",borderRadius:10}}/>
     </View>
    )
  }

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

       
        <View style={{height:0.23*SIZES.height}}>
          <View style={{flex:1, marginVertical:SIZES.base}}>
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={"normal"}
              scrollEventThrottle={16}
              pagingEnabled
              scrollEnabled
              data={introImages}
              keyExtractor={(item)=>item.id.toString()}
              renderItem={({item,index})=>renderBanner(item,index)}
            />
            {/* <Image source={images.banner1} style={{width:"100%", height:"100%"}} resizeMode="cover"/> */}
          </View>
        </View>
        <View style={{height:0.30*SIZES.height}}>
            <Menu />
        </View>
        <View style={{height:0.33*SIZES.height,backgroundColor:"green"}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1,paddingVertical:SIZES.padding},
});
