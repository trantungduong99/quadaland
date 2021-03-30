import React from 'react';
import {View,Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const ProjectDetail = ({route})=>{
  const item = route.params.item
  return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>{item.projectName}</Text>
    </View>
  )
}

export default ProjectDetail;