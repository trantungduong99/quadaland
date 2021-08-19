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
export default class MyProfile extends Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    sort_by: '-created_at',
    error: null,
    loadingMore: false,
    lastPage: 1,
  };
  componentDidMount() {
    // console.log(this.props);
    this._fetchProperty();
  }
  _fetchProperty = () => {
    const {page, lastPage,sort_by} = this.state;
    console.log({page, lastPage});
    const {username} = this.props.route.params;
    console.log('Đi lấy dữ liệu page ', page);
    if (page <= lastPage) {
      const query = {
        username: username,
        per_page: 10,
        page: page,
        sort_by: sort_by,
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
      <View style={styles.container}>
        <View style={styles.header_container}>
          <TouchableOpacity
            style={styles.button_back}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image
              source={icons.back}
              style={styles.button_back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text_title}>Bài đăng của tôi</Text>
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
