import React from 'react';
import {View,Text} from 'react-native';

const ShoppingDetail = ({item})=>{
  return(
    <View>
      <Text> shopping {item.id}</Text>
    </View>
  )
}

export default ShoppingDetail;