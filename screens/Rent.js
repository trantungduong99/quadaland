import React, {Component} from 'react';
import {getProperty} from '../services/authService';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableHighlightBase,
} from 'react-native';
import {icons, SIZES, COLORS, FONTS} from '../constants';
import RentVertical from '../components/RentVertical';
import _ from 'lodash';
export default class Rent extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    error: null,
    loadingMore: false,
    lastPage: 1,
  };
  componentDidMount() {
    // console.log(this.props);
    this._fetchProperty();
  }
  _fetchProperty = () => {
    const {page, lastPage} = this.state;
    console.log({page, lastPage});
    console.log('Đi lấy dữ liệu page ', page);
    if (page <= lastPage) {
      const query = {
        sale_method: 'for_rent',
        sort_by: '-created_at',
        per_page: 10,
        page: page,
      };
      getProperty(query)
        .then((response) => {
          console.log(response);
          this.setState((prevState, nextProps) => ({
            data:
              page === 1
                ? Array.from(response.data.result)
                : [...this.state.data, ...response.data.result],
            loading: false,
            lastPage: response.data.last_page,
          }));
        })
        .catch((e) => {
          this.setState({error: false, loading: false});
          console.log(e);
        });
    } else {
      console.log('hết trang');
      this.setState({loadingMore: false});
      return;
    }
  };
  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this._fetchProperty();
      },
    );
  };
  _renderFooter = () => {
    if (!this.state.loadingMore) return null;
    return (
      <View style={styles.foorter}>
        <Text>Loading...</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 0.05 * SIZES.height, marginTop: SIZES.padding}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: SIZES.padding,
              }}>
              <TouchableOpacity
                style={{width: 0.03 * SIZES.height}}
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
              <TouchableOpacity
                style={{width: '75%'}}
                onPress={() => {
                  this.props.navigation.navigate('Search', {
                    searchOption: 'rent',
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#C8CACE',
                    borderRadius: 0.05 * SIZES.height,
                    height: 0.05 * SIZES.height,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 0.06 * SIZES.height,
                      height: 0.05 * SIZES.height,
                      borderTopLeftRadius: 0.05 * SIZES.height,
                      borderBottomLeftRadius: 0.05 * SIZES.height,
                      backgroundColor: '#6BC4FC',
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
                        source={icons.rent}
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <Text>Tìm kiếm ...</Text>
                </View>
              </TouchableOpacity>
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
        </View>

        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1, marginTop: SIZES.padding}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    data={this.state.data}
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={0.7}
                    keyExtractor={(item) => {
                      return 'absjkajs' + Math.random();
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                      return <RentVertical item={item} />;
                    }}
                    initialNumToRender={10}
                    ListFooterComponent={this._renderFooter}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
  header_container: {
    alignItems: 'center',
    height: 50,
    borderBottomColor: COLORS.darkgray,
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
  },
  button_back: {height: 22, width: 22},
  text_title: {
    color: COLORS.black,
    ...FONTS.body2,
    marginLeft: 2 * SIZES.padding,
  },
  foorter: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
});
