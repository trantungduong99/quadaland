import React, {Component} from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  Alert,
} from 'react-native';
import {FONTS, SIZES, COLORS, images, icons,API} from '../constants';
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 0.07 * SIZES.height;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import MapView, {Circle, Marker, Polygon} from 'react-native-maps';
import asyncStorage from '@react-native-community/async-storage';
import {deleteProperty} from '../services/authService';
import {useAuthDispatch, useAuthState} from '../contexts/authContext';
import {DELETE_MY_PROPERTY} from '../actions/actionTypes';
import { media } from '../data/Data';

function hidePhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    const newPhoneNumber = match[1] + ' ' + match[2] + ' ' + match[3];
    const hideLast4Digits = newPhoneNumber.slice(0, -3);
    const maskedNumber = hideLast4Digits.padEnd(newPhoneNumber.length, '*');
    return maskedNumber;
  }
  return null;
}
export default class PropertyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      username: '',
      modalVisible: false,
      modalDeleteVisible: false,
      error: null,
    };
  }
  componentDidMount() {
    asyncStorage
      .getItem('username')
      .then((r) => {
        console.log(r);
        this.setState({username: r});
      })
      .catch((e) => {
        console.log(e);
      });
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  handleDelete = () => {
    this.setState({modalDeleteVisible: true, modalVisible: false});
  };
  handleEdit = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate('EditProperty', {
      property: this.props.route.params.item,
    });
  };
  _deleteProperty = (slug) => {
    deleteProperty(slug)
      .then((r) => {
        this.setState({modalDeleteVisible: false});
        if (r.status === 200) {
          Alert.alert('Thông báo', 'Đã xóa thành công', [
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ]);
        } else {
          Alert.alert('Thông báo', 'Đã xảy ra lỗi, thử lại sau!', [
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ]);
        }
      })
      .catch((e) => {
        console.log(e);
        Alert.alert('Thông báo', 'Đã xảy ra lỗi, thử lại sau!', [
          {text: 'OK', onPress: () => this.props.navigation.goBack()},
        ]);
      });
  };
  render() {
    const {company, details, sale_method, slug} = this.props.route.params.item;
    console.log('Vị trí ở thông tin chi tiết:', details.coordinate);
    const {modalVisible, modalDeleteVisible} = this.state;
    // console.log({company, details, sale_method});
    // console.log(this.state.username);
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const project = this.props.route.params.item;
    console.log(project.details);
    // console.log(project.company.user);
    const latlngDelta = {latitudeDelta: 0.02922, longitudeDelta: 0.02421};
    return (
      <View style={styles.fill}>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}>
          <View
            style={
              ({flex: 1, padding: SIZES.padding}, styles.scrollViewContent)
            }>
            <View style={styles.method_container}>
              <View style={styles.method_text_container}>
                <Text style={styles.text_method}>
                  {sale_method === 'for_sale' ? 'Mua bán' : 'Cho thuê'}
                </Text>
                <View style={styles.sub}></View>
              </View>
              <View style={styles.image_container}>
                <View style={styles.image_box}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 20}}
                    source={images.avatar}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
            <View style={styles.email_adress_container}>
              <Text style={styles.details_title}>{details.title}</Text>
              <Text style={styles.detail_address}>
                {details.address ? details.address : 'Đang cập nhật...'}
              </Text>
            </View>
            <View style={styles.price_area_container}>
              <Text style={styles.price_area}>
                {details.price
                  ? parseFloat(details.price) < 1000
                    ? details.price + 'triệu'
                    : (parseFloat(details.price) / 1000).toString() + 'tỷ'
                  : 'Đang cập nhật...'}
              </Text>
              <Text style={styles.price_area}>
                {details.area ? details.area+"m²" : 'Đang cập nhật...'}
              </Text>
            </View>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.text_mota}>Mô tả</Text>
            <Text style={styles.text_description}>{details.description}</Text>
          </View>
          <View style={styles.mini_map}>
            <View style={styles.mini_map_container}>
              <MapView
                style={styles.mini_map_style}
                initialRegion={{
                  latitude: parseFloat(details.coordinate.latitude),
                  longitude: parseFloat(details.coordinate.longitude),
                  ...latlngDelta,
                }}>
                <MapView.Marker
                  image={icons.marker}
                  coordinate={{
                    latitude: parseFloat(details.coordinate.latitude),
                    longitude: parseFloat(details.coordinate.longitude),
                  }}
                />
              </MapView>
            </View>
          </View>
          <View style={styles.react_space}>
            <View style={styles.underline}></View>
          </View>
        </Animated.ScrollView>
        <View style={styles.sub_infor_container}>
          <View style={styles.sub_infor}>
            <View style={styles.infor_row1}>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View style={styles.avatar_infor_container}>
                  <Image
                    source={images.avatar}
                    style={{height: 60, width: 60, borderRadius: 30}}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.infor_name_container}>
                  <Text style={{color: COLORS.black, ...FONTS.h4}}>
                    {company
                      ? company.full_name
                        ? company.full_name
                        : company.user
                      : 'Đang cập nhật...'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (company) {
                    this.props.navigation.navigate('CustomerProfile', {
                      company: company,
                    });
                  } else {
                    return;
                  }
                }}>
                <View style={styles.button_seen}>
                  <Text style={{color: COLORS.white, ...FONTS.body4}}>
                    Thông tin
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.button_chat_container}
                onPress={() => {
                  console.log('Chatnow on Pressed');
                }}>
                <View style={styles.button_chat}>
                  <Image
                    source={icons.message}
                    style={{width: 25, height: 25, tintColor: COLORS.white}}
                    resizeMode="contain"
                  />
                  <Text style={styles.text_chat}>Chat ngay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_call_container}
                onPress={() => {
                  Linking.openURL(
                    `tel:${
                      company ? (company.phone ? company.phone : '911') : '911'
                    }`,
                  );
                }}>
                <View style={styles.button_call}>
                  <Image
                    source={icons.call}
                    style={{width: 25, height: 25, tintColor: COLORS.primary}}
                    resizeMode="contain"
                  />
                  <Text style={styles.text_call}>
                    {company
                      ? hidePhoneNumber(company.phone)
                      : 'Đang cập nhật...'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Animated.View
          // pointerEvents="none"
          style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
          <Animated.FlatList
            data={details.media?details.media:media}
            keyExtractor={(item) => item.slug}
            horizontal
            snapToAlignment="end"
            scrollEventThrottle={16}
            decelerationRate={'fast'}
            pagingEnabled
            renderItem={({item}) => {
              return (
                <Animated.Image
                  style={{
                    height: HEADER_MAX_HEIGHT,
                    width: SIZES.width,
                    resizeMode: 'cover',
                    opacity: imageOpacity,
                    transform: [{translateY: imageTranslate}],
                  }}
                  source={{uri: API.CREATE_MEDIA_URL + '/' + item.slug}}
                />
              );
            }}
          />
          {/* <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={require('../assets/images/project1.jpg')}
          /> */}
        </Animated.View>
        <View style={styles.bar}>
          <TouchableOpacity
            style={{width: 0.035 * SIZES.height}}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={icons.back}
                resizeMode="contain"
                style={styles.button_header}
              />
            </View>
          </TouchableOpacity>
          {/* {company && this.state.username == company.user && (  */}
          {company && this.state.username == company.user && (
            <TouchableOpacity
              style={{width: 0.035 * SIZES.height}}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.more}
                  resizeMode="contain"
                  style={styles.button_header}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/* Modal edit & delete  */}
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
            <View style={styles.action_modal}>
              <TouchableOpacity
                style={styles.button_action}
                onPress={() => {
                  this.handleEdit();
                }}>
                <Text style={{color: COLORS.black, ...FONTS.body3}}>
                  Chỉnh sửa
                </Text>
                <Image
                  source={icons.edit}
                  style={styles.icon_action}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.line_action}></View>
              <TouchableOpacity
                style={styles.button_action}
                onPress={() => {
                  this.handleDelete();
                }}>
                <Text style={{color: COLORS.black, ...FONTS.body3}}>Xóa</Text>
                <Image
                  source={icons.delete_icon}
                  style={[styles.icon_action, {marginLeft: 30}]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Modal Delete  */}
        <Modal
          animationType="none"
          transparent={true}
          visible={modalDeleteVisible}
          onRequestClose={() => {
            this.setState({modalDeleteVisible: !modalDeleteVisible});
          }}>
          <View style={styles.delete_modal_container}>
            <View style={styles.delete_modal}>
              <View style={styles.delete_title}>
                <Text style={{color: COLORS.black, ...FONTS.h3}}>
                  Xóa bài đăng này?
                </Text>
              </View>
              <View style={styles.delete_confirm}>
                <TouchableOpacity
                  style={styles.delete_button}
                  onPress={() => {
                    this._deleteProperty(slug);
                  }}>
                  <Text>XÓA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancel_button}
                  onPress={() => {
                    this.setState({modalDeleteVisible: false});
                  }}>
                  <Text>HỦY</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cancel_button: {
    height: 50,
    width: 110,
    backgroundColor: '#BCF5A9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  delete_confirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    flexDirection: 'row',
  },
  delete_button: {
    height: 50,
    width: 110,
    backgroundColor: '#FA5858',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  delete_title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete_modal: {
    width: 250,
    height: 120,
    borderRadius: 10,
    marginTop: 250,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  delete_modal_container: {
    alignItems: 'center',
    flex: 1,
  },
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F2F2F2',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    padding: SIZES.padding,
    height: HEADER_MIN_HEIGHT,
    width: SIZES.width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
    padding: SIZES.padding,
    marginTop: SIZES.padding,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  method_container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  method_text_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text_method: {color: COLORS.primary, ...FONTS.h3},
  sub: {
    backgroundColor: COLORS.primary,
    marginLeft: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  image_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image_box: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
  },
  email_adress_container: {flex: 1, marginTop: SIZES.padding},
  details_title: {color: COLORS.black, ...FONTS.h3},
  detail_address: {
    color: COLORS.black,
    ...FONTS.body4,
    marginTop: SIZES.base,
  },
  price_area_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  price_area: {color: COLORS.primary, ...FONTS.body4},
  description_container: {flex: 1, padding: SIZES.padding},
  text_mota: {color: COLORS.black, ...FONTS.h3},
  text_description: {color: COLORS.black, ...FONTS.body3},
  mini_map: {height: SIZES.width / 1.5, padding: SIZES.padding},
  mini_map_container: {
    flex: 1,
    borderColor: COLORS.darkgray,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
  },
  mini_map_style: {
    flex: 1,
    borderRadius: 5,
  },
  react_space: {alignItems: 'center', padding: SIZES.padding},
  underline: {
    height: 3,
    backgroundColor: '#CCCCCC',
    width: '100%',
  },
  sub_infor_container: {
    height: 140,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  sub_infor: {
    flex: 1,
    borderRadius: 20,
    flexDirection: 'column',
    padding: SIZES.padding,
  },
  infor_row1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar_infor_container: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
  },
  infor_name_container: {
    width: SIZES.width - 180,
    paddingHorizontal: SIZES.padding,
  },
  button_seen: {
    backgroundColor: COLORS.primary,
    height: 30,
    width: 90,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_chat_container: {
    flex: 1,
    marginTop: SIZES.padding,
    marginRight: 0.5 * SIZES.padding,
    borderRadius: 5,
  },
  button_chat: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text_chat: {
    color: COLORS.white,
    ...FONTS.body4,
    marginLeft: SIZES.padding,
  },
  button_call_container: {
    flex: 1,
    flex: 1,
    marginTop: SIZES.padding,
    marginLeft: 0.5 * SIZES.padding,
    borderRadius: 5,
  },
  button_call: {
    flex: 1,
    borderRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text_call: {
    color: COLORS.primary,
    ...FONTS.body4,
    marginLeft: SIZES.padding,
  },
  button_header: {
    height: 0.035 * SIZES.height,
    width: 0.035 * SIZES.height,
    tintColor: COLORS.orange,
  },
  action_modal: {
    position: 'absolute',
    height: 80,
    width: 120,
    backgroundColor: '#F2F2F2',
    top: 66,
    right: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: SIZES.base,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  button_action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: SIZES.base,
  },
  icon_action: {height: 23, width: 23, marginLeft: SIZES.base},
  line_action: {
    height: 2,
    width: '100%',
    backgroundColor: '#CCCCCC',
  },
});
