import React from "react"
import {View,Text,TouchableOpacity,Image,FlatList} from 'react-native';
import {SIZES,FONTS,COLORS,icons,images} from '../constants';
import {dummyProjectData} from '../data/Data';
import ProductIntroItem from './ProductIntroItem';
import {useNavigation} from '@react-navigation/native';
const ProductIntro = ()=>{
  const navigation = useNavigation();
  return(
    <View style={{flex:1}}>
      <View style={{marginTop:SIZES.font}}>
                  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                      <Text style={{color:COLORS.black,...FONTS.h2}}>Dự án</Text>
                      <TouchableOpacity style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}} onPress={()=>{navigation.navigate("Project")}}>
                        <Text style={{color:COLORS.primary,...FONTS.body4}}>Xem tất cả</Text>
                        <Image source={icons.right_arrow} style={{height:18,width:18, tintColor:COLORS.primary,marginLeft:SIZES.base}}  resizeMode="contain"/>
                      </TouchableOpacity>
                  </View>
      </View>
      <View style={{flex:1,marginTop:SIZES.base,height:"100%"}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dummyProjectData}
            keyExtractor={(item)=>"keyProject"+item.id}
            renderItem={({item})=>{return(<ProductIntroItem item={item} />)}}
          />
        </View>
      </View>
     </View>
  )
}

export default ProductIntro