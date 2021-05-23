import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {API, COLORS, FONTS, SIZES, icons} from '../constants';
import {getMedia, deleteMedia} from '../services/authService';
import {useAuthState, useAuthDispatch} from '../contexts/authContext';
import {CHOOSE_MANY_PHOTOS, GET_MEDIA} from '../actions/actionTypes';
const _ = require('lodash');

const MyGallery = ({navigation}) => {
  const {galleryList, imagesSelected} = useAuthState();
  const dispatch = useAuthDispatch();
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  useEffect(() => {
    _fetchImages();
  }, []);
  useEffect(() => {
    console.log(imagesSelected);
  }, [imagesSelected]);
  const _fetchImages = async () => {
    console.log(page);
    if (page <= lastPage) {
      getMedia({page: page})
        .then((r) => {
          if (page === 1) {
            dispatch({type: GET_MEDIA, galleryList: r.data.result});
          } else {
            dispatch({
              type: GET_MEDIA,
              galleryList: [...galleryList, ...r.data.result],
            });
          }
          setLoading(false);
          setLastPage(r.data.last_page);
          setCount(r.data.count);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          setError(true);
        });
    } else {
      setLoadingMore(false);
      return;
    }
  };
  const _handleLoadMore = async () => {
    setPage(page + 1);
    setLoadingMore(true);
    _fetchImages();
  };
  const _renderFooter = () => {
    if (loadingMore == false) return null;
    return (
      <View style={styles.foorter}>
        <Text>Loading...</Text>
      </View>
    );
  };
  const handlePressOnImage = (slug) => {
    const uri = API.CREATE_MEDIA_URL + '/' + slug;
    console.log(slug);
    setSelectedImageURL(uri);
    setModalVisible(true);
  };
  const handleLongPressOnImage = async (slug) => {
    if (imagesSelected.includes(slug)) {
      // có trong mảng đã chọn
      const array = _.pull(imagesSelected, slug);
      await dispatch({type: CHOOSE_MANY_PHOTOS, imagesSelected: array});
    } else {
      //không có trong mảng đã chọn
      dispatch({
        type: CHOOSE_MANY_PHOTOS,
        imagesSelected: [...imagesSelected, slug],
      });
    }
  };
  const handleDeleteImages = async () => {
    const array = galleryList.filter((o) => {
      return !imagesSelected.includes(o.slug);
    });
    await dispatch({type: CHOOSE_MANY_PHOTOS, imagesSelected: []});
    await dispatch({type: GET_MEDIA, galleryList: array});
    deleteMedia(imagesSelected)
      .then((r) => {
        console.log('deleteMedia response', r);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  };
  const handleGoBack = async () => {
    dispatch({type: GET_MEDIA, galleryList: []});
    dispatch({type: CHOOSE_MANY_PHOTOS, imagesSelected: []});
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.button_back}
            onPress={() => {
              handleGoBack();
            }}>
            <Image
              source={icons.back}
              style={styles.button_back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text_title}>Kho Ảnh</Text>
        </View>
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'red'}}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={galleryList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          onEndReachedThreshold={0.5}
          initialNumToRender={25}
          onEndReached={() => {
            _handleLoadMore();
          }}
          numColumns={3}
          ListFooterComponent={_renderFooter()}
          renderItem={({item, index}) => {
            return (
              <View key={Math.random()} style={styles.image_container}>
                <TouchableOpacity
                  key={item.slug}
                  style={{flex: 1}}
                  onPress={() => {
                    handlePressOnImage(item.slug);
                  }}
                  onLongPress={() => {
                    handleLongPressOnImage(item.slug);
                  }}>
                  <Image
                    source={{uri: API.CREATE_MEDIA_URL + '/' + item.slug}}
                    style={
                      imagesSelected.includes(item.slug)
                        ? styles.image_selected
                        : styles.image
                    }
                    resizeMode="cover"
                  />
                  {imagesSelected.includes(item.slug) && (
                    <Image
                      source={icons.checkmark}
                      style={styles.checkmark}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
      <Modal
        transparent={false}
        animationType={'fade'}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedImageURL('');
        }}>
        <View style={styles.modelStyle}>
          <Image
            style={styles.fullImageStyle}
            source={{uri: selectedImageURL}}
            resizeMode="contain"
          />
          <TouchableOpacity
            activeOpacity={0.1}
            style={styles.closeButtonStyle}
            onPress={() => {
              setModalVisible(false);
              setSelectedImageURL('');
            }}>
            <Image
              source={icons.cancel}
              style={{width: 20, height: 20, tintColor: COLORS.white}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
      {imagesSelected.length > 0 && (
        <View style={styles.foorter_option}>
          <TouchableOpacity
            style={[styles.button_delete, {marginRight: SIZES.width / 3}]}
            onPress={() => {
              handleDeleteImages();
            }}>
            <Image
              source={icons.delete_icon}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text style={{color: COLORS.black, ...FONTS.body5}}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_delete}>
            <Image
              source={icons.add_image}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text style={{color: COLORS.black, ...FONTS.body5}}>Chọn</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image_container: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  image: {
    height: 120,
    width: '100%',
  },
  image_selected: {
    height: 120,
    width: '100%',
    opacity: 0.5,
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 15,
    height: 15,
    tintColor: 'white',
  },
  header_container: {
    alignItems: 'center',
    height: 50,
    borderBottomColor: COLORS.darkgray,
    borderBottomWidth: 1,
    paddingHorizontal: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 86, 102, 0.62)',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },

  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 50,
    right: 20,
    position: 'absolute',
  },
  foorter_option: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_delete: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MyGallery;
