import React from 'react';
import {Image,View} from 'react-native';
import {SIZES} from '../constants';

const CarouselItem = ({item})=>{
  return(
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <Image source={item.img} resizeMode="cover" style={{width:SIZES.width-2*SIZES.padding,height:"100%",borderRadius:10}}/>
    </View>
  )
}

export default CarouselItem