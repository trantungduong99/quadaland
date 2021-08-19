import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {BookmarkItem} from '../components';
import {COLORS, icons, SIZES, FONTS} from '../constants';
import {getBookmarks} from '../services/authService';
const MyBookmark = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastPage, setLastPage] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(1);
    fetchBookmark();
  }, [loadingMore]);
  const fetchBookmark = async () => {
    if (page <= lastPage) {
      const pagination = {
        page,
      };
      getBookmarks(pagination)
        .then((response) => {
          setData(
            page === 1
              ? Array.from(response.data.result)
              : [...data, ...response.data.result],
          );
          console.log(response.data);
          setLoading(false);
          setLoadingMore(false);
          setLastPage(response.data.last_page);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.message);
        });
    } else {
      return;
    }
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    setLoadingMore(true);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <Text>Loading...</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <TouchableOpacity
          style={styles.button_back}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={icons.back}
            style={styles.button_back}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text_title}>Đã lưu</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, marginTop: SIZES.padding}}>
            <View
              style={{
                flex: 1,
              }}>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                <FlatList
                  data={data}
                  onEndReached={() => {
                    handleLoadMore();
                  }}
                  onEndReachedThreshold={0.7}
                  keyExtractor={(item) => {
                    return 'absjkajs' + Math.random();
                  }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return <BookmarkItem item={item} />;
                  }}
                  initialNumToRender={10}
                  ListFooterComponent={() => {
                    return renderFooter();
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  footer: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
});
export default MyBookmark;
