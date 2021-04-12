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
} from 'react-native';
import {FONTS, SIZES, COLORS, images, icons} from '../constants';
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 0.07 * SIZES.height;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const phoneNumber = '0935028053';
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

export default class ShoppingDetail extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.

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
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.primary, ...FONTS.h3}}>Mua bán</Text>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    marginLeft: SIZES.padding,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                    borderRadius: 4,
                  }}>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 20,
                  }}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 20}}
                    source={images.avatar}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 1, marginTop: SIZES.padding}}>
              <Text style={{color: COLORS.black, ...FONTS.h3}}>
                {project.title}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.body4,
                  marginTop: SIZES.base,
                }}>
                {project.address}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: SIZES.base,
              }}>
              <Text style={{color: COLORS.primary, ...FONTS.body4}}>
                {project.price}
              </Text>
              <Text style={{color: COLORS.primary, ...FONTS.body4}}>
              {project.acreage}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, padding: SIZES.padding}}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>
              Mô tả
            </Text>
            <Text style={{color: COLORS.black, ...FONTS.body3}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ligula
              ullamcorper malesuada proin libero nunc consequat interdum varius
              sit. Dignissim sodales ut eu sem. Porta nibh venenatis cras sed
              felis eget velit aliquet sagittis. Faucibus vitae aliquet nec
              ullamcorper sit amet risus. Dolor sit amet consectetur adipiscing.
              Eget velit aliquet sagittis id consectetur purus. Pretium
              vulputate sapien nec sagittis aliquam malesuada bibendum arcu
              vitae. Sed adipiscing diam donec adipiscing tristique risus.
              Consequat mauris nunc congue nisi vitae suscipit tellus mauris.
              Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Sit
              amet purus gravida quis blandit turpis cursus in hac. Porttitor
              eget dolor morbi non arcu. Vitae elementum curabitur vitae nunc
              sed velit dignissim sodales. Est lorem ipsum dolor sit amet.
              Maecenas pharetra convallis posuere morbi. Augue eget arcu dictum
              varius duis at. Dolor sit amet consectetur adipiscing elit. Mi in
              nulla posuere sollicitudin. Pretium vulputate sapien nec sagittis.
              Ut pharetra sit amet aliquam id diam. Sed cras ornare arcu dui
              vivamus. Malesuada pellentesque elit eget gravida cum. Placerat
              orci nulla pellentesque dignissim enim sit amet. Ullamcorper eget
              nulla facilisi etiam dignissim diam quis enim lobortis. Suscipit
              adipiscing bibendum est ultricies integer quis auctor elit.
              Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar
              pellentesque. Commodo quis imperdiet massa tincidunt nunc pulvinar
              sapien et ligula. Gravida arcu ac tortor dignissim convallis
              aenean. Vestibulum mattis ullamcorper velit sed ullamcorper morbi
              tincidunt ornare. Vel pharetra vel turpis nunc eget. Faucibus a
              pellentesque sit amet porttitor eget dolor morbi. Ac placerat
              vestibulum lectus mauris ultrices. Eget mi proin sed libero enim
              sed faucibus turpis in.
            </Text>
          </View>
        </Animated.ScrollView>
        <View
          style={{
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
          }}>
          <View
            style={{
              flex: 1,
              borderRadius: 20,
              flexDirection: 'column',
              padding: SIZES.padding,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: COLORS.lightGray,
                  }}>
                  <Image
                    source={images.avatar}
                    style={{height: 60, width: 60, borderRadius: 30}}
                    resizeMode="cover"
                  />
                </View>
                <View
                  style={{
                    width: SIZES.width - 180,
                    paddingHorizontal: SIZES.padding,
                  }}>
                  <Text style={{color: COLORS.black, ...FONTS.h4}}>
                    Trần Tấn Chung
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log('Follow on Pressed');
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    height: 30,
                    width: 90,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: COLORS.white, ...FONTS.body4}}>
                    Theo dõi
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginTop: SIZES.padding,
                  marginRight: 0.5 * SIZES.padding,
                  borderRadius: 5,
                }}
                onPress={() => {
                  console.log('Chatnow on Pressed');
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
                    borderRadius: 5,
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={icons.message}
                    style={{width: 25, height: 25, tintColor: COLORS.white}}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                      marginLeft: SIZES.padding,
                    }}>
                    Chat ngay
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flex: 1,
                  marginTop: SIZES.padding,
                  marginLeft: 0.5 * SIZES.padding,
                  borderRadius: 5,
                }}
                onPress={() => {
                  Linking.openURL(`tel:${'0935028053'}`);
                }}>
                <View
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={icons.call}
                    style={{width: 25, height: 25, tintColor: COLORS.primary}}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: COLORS.primary,
                      ...FONTS.body4,
                      marginLeft: SIZES.padding,
                    }}>
                    {hidePhoneNumber(phoneNumber)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Animated.View
          pointerEvents="none"
          style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={require('../assets/images/project1.jpg')}
          />
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
                style={{
                  height: 0.035 * SIZES.height,
                  width: 0.035 * SIZES.height,
                  tintColor: COLORS.orange,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: 0.035 * SIZES.height}}
            onPress={() => {
              console.log('MoreAction in ProjectDetail on Pressed');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={icons.more}
                resizeMode="contain"
                style={{
                  height: 0.035 * SIZES.height,
                  width: 0.035 * SIZES.height,
                  tintColor: COLORS.orange,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
