import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import {icons, SIZES, COLORS, FONTS} from '../constants';

class Search extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      input: null,
      searchOption: this.props.route.params.searchOption,
      modalVisible: false,
    };
  }
  handleChangeInput = (text) => {
    this.setState({input: text});
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  setSearchOption = (option) => {
    this.setState({searchOption: option},()=>{this.setModalVisible(false)});
  };

  render() {
    const {input, modalVisible,searchOption} = this.state;
    console.log(searchOption);
    return (
      <View style={{flex: 1}}>
        {/* Header Search input */}
        <View
          style={{
            height: 0.05 * SIZES.height,
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{height: 0.03 * SIZES.height}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    tintColor: COLORS.secondary,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: '75%',
                height: '100%',
                backgroundColor: '#C8CACE',
                borderRadius: 0.025 * SIZES.height,
                justifyContent: 'flex-start',
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    width: 0.06 * SIZES.height,
                    height: '100%',
                    borderBottomLeftRadius: 0.025 * SIZES.height,
                    borderTopLeftRadius: 0.025 * SIZES.height,
                  }}
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <View
                    style={{
                      width: 0.06 * SIZES.height,
                      height: '100%',
                      backgroundColor: '#6BC4FC',
                      borderBottomLeftRadius: 0.025 * SIZES.height,
                      borderTopLeftRadius: 0.025 * SIZES.height,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 30,
                        height: 30,
                        backgroundColor: '#def',
                        borderRadius: 10,
                        padding: 5,
                      }}>
                      <Image
                        source={
                          searchOption === 'project'
                            ? icons.building
                            : searchOption === 'shopping'
                            ? icons.buy
                            : icons.rent
                        }
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TextInput
                  style={{
                    flex: 1,
                    borderTopRightRadius: 0.025 * SIZES.height,
                    borderBottomRightRadius: 0.025 * SIZES.height,
                  }}
                  placeholder="Tìm kiếm..."
                  onChangeText={this.handleChangeInput}
                  value={input}
                  onSubmitEditing={() => {
                    console.log(input);
                  }}></TextInput>
              </View>
            </View>

            <TouchableOpacity
              style={{width: 0.05 * SIZES.height}}
              onPress={() => {
                this.props.navigation.navigate('Map');
              }}>
              <View
                style={{
                  backgroundColor: '#0099CC',
                  borderRadius: 0.05 * SIZES.height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.map}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    margin: 0.01 * SIZES.height,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* End Header Search input */}
        <View style={{height: '100%'}}></View>

        {/* Modal Search Option  */}
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPressOut={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    width: '100%',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  }}
                  onPress={() => {
                    this.setSearchOption('shopping');
                    console.log(this.state.option)
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginTop: SIZES.padding,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray,
                        padding: SIZES.base,
                      }}>
                      <Image
                        source={icons.buy}
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={styles.optionText}>Mua bán</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1, width: '100%'}}
                  onPress={() => {
                    this.setSearchOption('project');
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginTop: SIZES.padding,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray,
                        padding: SIZES.base,
                      }}>
                      <Image
                        source={icons.building}
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={styles.optionText}>Dự án</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1, width: '100%'}}
                  onPress={() => {
                    this.setSearchOption('rent');
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginTop: SIZES.padding,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray,
                        padding: SIZES.base,
                      }}>
                      <Image
                        source={icons.rent}
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={styles.optionText}>Cho thuê</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
    backgroundColor: '#FAFAFA',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    marginLeft: SIZES.padding,
    color: COLORS.black,
    ...FONTS.h4,
  },
});
export default Search;
