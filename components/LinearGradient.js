import React, { Component } from 'react';
import { View ,Text} from 'react-native';

export default class LinearGradient extends Component {
  constructor(props){
    super(props);
    // console.log(props)
  }
  render() {
    const gradientHeight=this.props.height;
    const gradientBackground  = this.props.backgroundColor;
    const title = this.props.title
        const data = Array.from({ length: gradientHeight });
        return (
            <View style={{flex:1}}>
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            backgroundColor: gradientBackground,
                            height: 2,
                            bottom: (gradientHeight - i),
                            right: 0,
                            left: 0,
                            zIndex: 2,
                            opacity: (1 / gradientHeight) * (i + 1)
                        }}
                    >
                    </View>
                ))}
            </View>
        );
  }
}