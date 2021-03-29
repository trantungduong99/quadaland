import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {SIZES} from '../constants';
const ProjectVertival = ({item}) => {
  return (
    <View>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            marginBottom: SIZES.padding,
          }}>
          <TouchableOpacity
          style={{
            borderRadius: 10,
            shadowColor: '#00000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2.62,
            elevation: 3,
          }}
          onPress={() => {
            console.log('project' + item.id);
          }}S
          >
            <Image
              source={item.img}
              style={{width:SIZES.width-2*SIZES.padding,height: '100%', borderRadius: 10}}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ProjectVertival;
