import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {icons, SIZES, COLORS, FONTS} from '../constants';
import {FilterOption, SearchTag} from '../components';
import RentVertical from '../components/RentVertical';
import {getProperty} from '../services/authService';

const _ = require('lodash');
class Search extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      input: null,
      searchOption: this.props.route.params.searchOption,
      modalVisible: false,
      modalTypeVisible: false,
      modalDistrictVisible: false,
      modalAreaVisible: false,
      modalMinPriceVisible: false,
      modalMaxPriceVisible: false,
      saleMethodOption: null,
      sale_method: null,
      search: null,
      areaString: null,
      minPriceString: null,
      maxPriceString: null,
      min_area: null,
      max_area: null,
      min_price: null,
      max_price: null,
      data: [],
      page: 1,
      loading: null,
      error: null,
      loadingMore: false,
      lastPage: 1,
      per_page: 10,
      count: null,
      searchBy: null,
      type_isChoose: false,
      district_isChoose: false,
      area_isChoose: false,
      min_price_isChoose: false,
      max_price_isChoose: false,
    };
  }

  _fetchProperty = () => {
    const {
      lastPage,
      per_page,
      page,
      search,
      sale_method,
      min_area,
      max_area,
      min_price,
      max_price,
    } = this.state;

    if (page <= lastPage) {
      if (page == 1) {
        this.setState({loading: true});
      }
      const query1 = _.pickBy(
        {
          per_page,
          page,
          search,
          sale_method,
          min_area,
          max_area,
          min_price,
          max_price,
        },
        _.identity,
      );
      const query2 = {
        search: this.state.input,
        sale_method: this.state.searchOption,
        per_page: this.state.per_page,
        page: this.state.page,
      };
      console.log(query2);

      getProperty(this.state.searchBy == 'filter' ? query1 : query2)
        .then((response) => {
          this.setState((prevState, nextProps) => ({
            data:
              page === 1
                ? Array.from(response.data.result)
                : [...this.state.data, ...response.data.result],
            loading: false,
            lastPage: response.data.last_page,
            count: response.data.count,
          }));
          console.log(response.data.count);
        })
        .catch((e) => {
          this.setState({error: false, loading: false});
          console.log(e);
        });
    } else {
      this.setState({loadingMore: false});
      return;
    }
  };
  _renderFooter = () => {
    if (!this.state.loadingMore) return null;
    return (
      <View style={styles.foorter}>
        <Text>Loading...</Text>
      </View>
    );
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
  handleChangeInput = (text) => {
    this.setState({input: text, searchBy: 'search'});
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  setSearchOption = (option) => {
    this.setState({searchOption: option, searchBy: 'search'}, () => {
      this.setModalVisible(false);
    });
  };

  handleOnPress = (value) => {
    if (value == 'Loại BĐS') {
      this.setState({
        modalTypeVisible: true,
        type_isChoose: false,
        searchBy: 'filter',
      });
    }
    if (value == 'Quận huyện') {
      this.setState({
        modalDistrictVisible: true,
        district_isChoose: false,
        searchBy: 'filter',
      });
    }
    if (value == 'Diện tích') {
      this.setState({
        modalAreaVisible: true,
        area_isChoose: false,
        searchBy: 'filter',
      });
    }
    if (value == 'Giá thấp nhất') {
      this.setState({
        modalMinPriceVisible: true,
        min_price_isChoose: false,
        searchBy: 'filter',
      });
    }
    if (value == 'Giá cao nhất') {
      this.setState({
        modalMaxPriceVisible: true,
        max_price_isChoose: false,
        searchBy: 'filter',
      });
    }
  };
  handleDeleteAllSearchTag = () => {
    this.setState({
      sale_method: null,
      search: null,
      areaString: null,
      minPriceString: null,
      maxPriceString: null,
      min_area: null,
      max_area: null,
      min_price: null,
      max_price: null,
      data: [],
      page: 1,
      loading: null,
      error: null,
      loadingMore: false,
      lastPage: 1,
      per_page: 10,
      count: null,
      type_isChoose: false,
      district_isChoose: false,
      area_isChoose: false,
      min_price_isChoose: false,
      max_price_isChoose: false,
    });
  };
  handleOnPressSearchTag = (value) => {
    console.log(value);
    if (value == 'sale_method') {
      this.setState(
        {
          sale_method: null,
          lastPage: 1,
          per_page: 10,
          page: 1,
          count: null,
          type_isChoose: false,
        },
        () => {
          this._fetchProperty();
        },
      );
    }
    if (value == 'district') {
      this.setState(
        {
          search: null,
          lastPage: 1,
          per_page: 10,
          page: 1,
          count: null,
          district_isChoose: false,
        },
        () => {
          this._fetchProperty();
        },
      );
    }
    if (value == 'area') {
      this.setState(
        {
          min_area: null,
          max_area: null,
          areaString: null,
          lastPage: 1,
          per_page: 10,
          page: 1,
          count: null,
          area_isChoose: false,
        },
        () => {
          this._fetchProperty();
        },
      );
    }
    if (value == 'min_price') {
      this.setState(
        {
          min_price: null,
          minPriceString: null,
          lastPage: 1,
          per_page: 10,
          page: 1,
          count: null,
          min_price_isChoose: false,
        },
        () => {
          this._fetchProperty();
        },
      );
    }
    if (value == 'max_price') {
      this.setState(
        {
          max_price: null,
          maxPriceString: null,
          lastPage: 1,
          per_page: 10,
          page: 1,
          count: null,
          max_price_isChoose: false,
        },
        () => {
          this._fetchProperty();
        },
      );
    }
  };
  render() {
    const {input, modalVisible, searchOption} = this.state;

    return (
      <View style={{flex: 1}}>
        {/* Header Search input */}
        <View style={styles.search_bar_container}>
          <View style={styles.search_bar}>
            <TouchableOpacity
              style={{height: 0.03 * SIZES.height}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={styles.image_back}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.search}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.option_button}
                  onPress={() => {
                    this.setModalVisible(true);
                  }}>
                  <View style={styles.image_container}>
                    <View style={styles.image_bao}>
                      <Image
                        source={
                          searchOption === 'for_sale' ? icons.buy : icons.rent
                        }
                        style={{height: '100%', width: '100%'}}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TextInput
                  style={styles.search_text_input}
                  placeholder="Tìm kiếm..."
                  onChangeText={this.handleChangeInput}
                  value={input}
                  onSubmitEditing={() => {
                    this.setState({lastPage: 1, page: 1}, () => {
                      this._fetchProperty();
                    });
                  }}></TextInput>
              </View>
            </View>

            <TouchableOpacity
              style={{width: 0.05 * SIZES.height}}
              onPress={() => {
                this.props.navigation.navigate('Map');
              }}>
              <View style={styles.map_button_container}>
                <Image
                  source={icons.map}
                  resizeMode="contain"
                  style={styles.map_button_image}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* End Header Search input */}
        {/* FilterOption */}
        <View
          style={{
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={icons.filter1}
                style={{width: 27, height: 27, marginHorizontal: SIZES.padding}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <FilterOption
              name="Loại BĐS"
              onPressIt={this.handleOnPress}
              isChoose={this.state.type_isChoose}
            />
            <FilterOption
              name="Quận huyện"
              onPressIt={this.handleOnPress}
              isChoose={this.state.district_isChoose}
            />
            <FilterOption
              name="Diện tích"
              onPressIt={this.handleOnPress}
              isChoose={this.state.area_isChoose}
            />
            <FilterOption
              name="Giá thấp nhất"
              onPressIt={this.handleOnPress}
              isChoose={this.state.min_price_isChoose}
            />
            <FilterOption
              name="Giá cao nhất"
              onPressIt={this.handleOnPress}
              isChoose={this.state.max_price_isChoose}
            />
          </ScrollView>
        </View>
        {/* Search Tag */}
        <View
          style={{
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingLeft: SIZES.padding,
          }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={this.handleDeleteAllSearchTag}>
              <Text
                style={{
                  color: COLORS.black,
                  ...FONTS.body4,
                  marginRight: SIZES.base,
                }}>
                Xóa tất cả
              </Text>
            </TouchableOpacity>
            {this.state.sale_method && (
              <SearchTag
                name={
                  this.state.sale_method == 'for_sale' ? 'Mua bán' : 'Cho thuê'
                }
                searchRef="sale_method"
                onPress={this.handleOnPressSearchTag}
              />
            )}
            {this.state.search && (
              <SearchTag
                name={this.state.search}
                searchRef="district"
                onPress={this.handleOnPressSearchTag}
              />
            )}
            {this.state.areaString && (
              <SearchTag
                name={this.state.areaString}
                searchRef="area"
                onPress={this.handleOnPressSearchTag}
              />
            )}
            {this.state.minPriceString && (
              <SearchTag
                name={this.state.minPriceString}
                searchRef="min_price"
                onPress={this.handleOnPressSearchTag}
              />
            )}
            {this.state.maxPriceString && (
              <SearchTag
                name={this.state.maxPriceString}
                searchRef="max_price"
                onPress={this.handleOnPressSearchTag}
              />
            )}
          </ScrollView>
        </View>
        {this.state.count != null ? (
          <Text
            style={{
              marginLeft: SIZES.padding,
              color: COLORS.black,
              ...FONTS.body5,
              marginBottom: SIZES.base,
            }}>
            Có {this.state.count} kết quả phù hợp
          </Text>
        ) : null}
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
                    this.setSearchOption('for_sale');
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
                    this.setSearchOption('for_rent');
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
        {/* Modal type real estate  */}
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalTypeVisible}
          onRequestClose={() => {
            this.setState({modalTypeVisible: !this.state.modalTypeVisible});
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPressOut={() => {
              this.setState({modalTypeVisible: !this.state.modalTypeVisible});
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
                    this.setState({sale_method: null}, () => {
                      this.setState(
                        {
                          modalTypeVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
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
                        source={icons.community}
                        resizeMode="contain"
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={styles.optionText}>Tất cả</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{flex: 1, width: '100%'}}
                  onPress={() => {
                    this.setState({sale_method: 'for_sale'}, () => {
                      this.setState(
                        {
                          modalTypeVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          type_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
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
                    this.setState({sale_method: 'for_rent'}, () => {
                      this.setState(
                        {
                          modalTypeVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          type_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
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
        {/* Modal district */}
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalDistrictVisible}
          onRequestClose={() => {
            this.setState({
              modalDistrictVisible: !this.state.modalDistrictVisible,
            });
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPressOut={() => {
              this.setState({
                modalDistrictVisible: !this.state.modalDistrictVisible,
              });
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Hải Châu'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Quận Hải Châu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Cẩm Lệ'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Quận Cẩm Lệ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Thanh Khê'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Quận Thanh Khê</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Liên Chiểu'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Quận Liên Chiểu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Ngũ Hành Sơn'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Quận Ngũ Hành Sơn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Sơn Trà'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Quận Sơn Trà</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Hòa Vang'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Huyện Hòa Vang</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState({search: 'Hoàng Sa'}, () => {
                      this.setState(
                        {
                          modalDistrictVisible: false,
                          page: 1,
                          per_page: 10,
                          lastPage: 1,
                          count: null,
                          district_isChoose: true,
                        },
                        () => {
                          this._fetchProperty();
                        },
                      );
                    });
                  }}>
                  <Text style={styles.text_tag}>Huyện Hoàng Sa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        {/* Modal AREA */}
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalAreaVisible}
          onRequestClose={() => {
            this.setState({
              modalAreaVisible: !this.state.modalAreaVisible,
            });
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPressOut={() => {
              this.setState({
                modalAreaVisible: !this.state.modalAreaVisible,
              });
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_area: 30, areaString: 'Dưới 30m²'},
                      () => {
                        this.setState(
                          {
                            modalAreaVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            area_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>Dưới 30m²</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_area: 30, max_area: 100, areaString: '30 - 100m²'},
                      () => {
                        this.setState(
                          {
                            modalAreaVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            area_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>30 - 100m²</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_area: 100, max_area: 150, areaString: '100 - 150m²'},
                      () => {
                        this.setState(
                          {
                            modalAreaVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            area_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>100 - 150m²</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_area: 150, max_area: 300, areaString: '150 - 300m²'},
                      () => {
                        this.setState(
                          {
                            modalAreaVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            area_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>150 - 300m²</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_area: 300, max_area: 500, areaString: '300 - 500m²'},
                      () => {
                        this.setState(
                          {
                            modalAreaVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            area_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>300 - 500m²</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_area: 500, areaString: '500m² trở lên'},
                      () => {
                        this.setState(
                          {
                            modalAreaVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            area_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>500m² trở lên</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalMinPriceVisible}
          onRequestClose={() => {
            this.setState({
              modalMinPriceVisible: !this.state.modalMinPriceVisible,
            });
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPressOut={() => {
              this.setState({
                modalMinPriceVisible: !this.state.modalMinPriceVisible,
              });
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 300, minPriceString: '300 triệu'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>300 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 500, minPriceString: '500 triệu'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>500 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 800, minPriceString: '800 triệu'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>800 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 1000, minPriceString: '1 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>1 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 3000, minPriceString: '3 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>3 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 7000, minPriceString: '7 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>7 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 10000, minPriceString: '10 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>10 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 20000, minPriceString: '20 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>20 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {min_price: 30000, minPriceString: '30 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMinPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            min_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>30 tỷ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Max Price  */}
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalMaxPriceVisible}
          onRequestClose={() => {
            this.setState({
              modalMaxPriceVisible: !this.state.modalMaxPriceVisible,
            });
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPressOut={() => {
              this.setState({
                modalMaxPriceVisible: !this.state.modalMaxPriceVisible,
              });
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 300, maxPriceString: '300 triệu'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>300 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 500, maxPriceString: '500 triệu'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>500 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 800, maxPriceString: '800 triệu'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>800 triệu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 1000, maxPriceString: '1 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>1 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 3000, maxPriceString: '3 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>3 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 7000, maxPriceString: '7 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>7 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 10000, maxPriceString: '10 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>10 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 20000, maxPriceString: '20 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>20 tỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.district_modal_button}
                  onPress={() => {
                    this.setState(
                      {max_price: 30000, maxPriceString: '30 tỷ'},
                      () => {
                        this.setState(
                          {
                            modalMaxPriceVisible: false,
                            page: 1,
                            per_page: 10,
                            lastPage: 1,
                            count: null,
                            max_price_isChoose: true,
                          },
                          () => {
                            this._fetchProperty();
                          },
                        );
                      },
                    );
                  }}>
                  <Text style={styles.text_tag}>30 tỷ</Text>
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
  search_bar_container: {
    height: 0.05 * SIZES.height,
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  search_bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_back: {
    height: 0.03 * SIZES.height,
    width: 0.03 * SIZES.height,
    tintColor: COLORS.secondary,
  },
  search: {
    flexDirection: 'row',
    width: '75%',
    height: '100%',
    backgroundColor: '#C8CACE',
    borderRadius: 0.025 * SIZES.height,
    justifyContent: 'flex-start',
  },
  option_button: {
    width: 0.06 * SIZES.height,
    height: '100%',
    borderBottomLeftRadius: 0.025 * SIZES.height,
    borderTopLeftRadius: 0.025 * SIZES.height,
  },
  image_container: {
    width: 0.06 * SIZES.height,
    height: '100%',
    backgroundColor: '#cde5f5',
    borderBottomLeftRadius: 0.025 * SIZES.height,
    borderTopLeftRadius: 0.025 * SIZES.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_bao: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5,
  },
  search_text_input: {
    flex: 1,
    borderTopRightRadius: 0.025 * SIZES.height,
    borderBottomRightRadius: 0.025 * SIZES.height,
  },
  map_button_container: {
    backgroundColor: '#0099CC',
    borderRadius: 0.05 * SIZES.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map_button_image: {
    height: 0.03 * SIZES.height,
    width: 0.03 * SIZES.height,
    margin: 0.01 * SIZES.height,
    tintColor: COLORS.white,
  },
  text_tag: {
    color: COLORS.black,
    ...FONTS.body4,
    margin: SIZES.padding2,
  },
  district_modal_button: {
    marginHorizontal: SIZES.base,
  },
  foorter: {
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
});
export default Search;
