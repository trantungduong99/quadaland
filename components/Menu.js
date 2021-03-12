import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {icons,SIZES,COLORS} from '../constants';
import MenuItem from './MenuItem';

const Menu=({navigation})=>{
  return(
    <View style={{flex:1,flexDirection:"column",paddingVertical:SIZES.padding}}>
      {/* Hang tren */}
      <View style={{flex:1,flexDirection:"row",width:"100%",height:"50%"}}>
          <MenuItem icon={icons.conversation} name="Cộng đồng" target="Community"/>
          <MenuItem icon={icons.building} name="Dự án" target="Project"/>
          <MenuItem icon={icons.buy} name="Mua bán" target="Shopping"/>
          <MenuItem icon={icons.rent} name="Cho thuê" target="Rent"/>
      </View>

      {/* Hang duoi */}
      <View style={{flex:1,flexDirection:"row",width:"100%",height:"50%"}}>
      <MenuItem icon={icons.sofa} name="Trang trí" target="Community"/>
      <MenuItem icon={icons.house} name="Nhà đẹp" target="Community"/>
      <MenuItem icon={icons.newspaper} name="Tin tức" target="News"/>
      <MenuItem icon={icons.location} name="Quanh đây" target="Map"/>
      </View>

    </View>
  )
}

export default Menu