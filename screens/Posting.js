import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS, API} from '../constants';
import {createProperty} from '../services/authService';
import {useAuthState} from '../contexts/authContext';
const Posting = ({navigation}) => {
  const [saleMethod, setSaleMethod] = useState('for_sale');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [isValidArea, setIsValidArea] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const [edited, setEdited] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(true);
  const {coordinate} = useAuthState();
  const handleCreateProperty = async () => {
    var property = {};
    if (
      saleMethod &&
      description &&
      address &&
      title &&
      area &&
      price &&
      coordinate &&
      isValidAddress &&
      isValidArea &&
      isValidDescription &&
      isValidPrice &&
      isValidTitle
    ) {
      property.sale_method = saleMethod;
      property.details = {area, price, address, title, description, coordinate};
      // console.log('property :', property);
      createProperty(property)
        .then((r) => {
          if (r.data.created_at) {
            console.log('Create Thành công');
            setSubmitSuccess(true);
            setModalVisible(true);
          } else {
            console.log('Create Thất bại');
            setSubmitSuccess(false);
            setModalVisible(true);
          }
        })
        .catch((e) => {
          setSubmitSuccess(false);
          setModalVisible(true);
          console.log(e);
        });
    } else {
      setSubmitSuccess(false);
      setModalVisible(true);
    }
  };
  const text_AreaChange = (val) => {
    setEdited(true);
    if (val > 0 && !isNaN(val)) {
      setArea(parseFloat(val));
      setIsValidArea(true);
    } else {
      setArea(parseFloat(val));
      setIsValidArea(false);
    }
  };
  const text_PriceChange = (val) => {
    setEdited(true);
    if (val > 0 && !isNaN(val)) {
      setPrice(parseFloat(val));
      setIsValidPrice(true);
    } else {
      setPrice(parseFloat(val));
      setIsValidPrice(false);
    }
  };
  const text_AddressChange = (val) => {
    setEdited(true);
    if (val.trim().length >= 10) {
      setAddress(val);
      setIsValidAddress(true);
    } else {
      setAddress(val);
      setIsValidAddress(false);
    }
  };
  const text_TitleChange = (val) => {
    setEdited(true);
    if (val.trim().length >= 10) {
      setTitle(val);
      setIsValidTitle(true);
    } else {
      setTitle(val);
      setIsValidTitle(false);
    }
  };
  const text_DescriptionChange = (val) => {
    setEdited(true);
    if (val.trim().length >= 50 && val.trim().length <= 1000) {
      setDescription(val);
      setIsValidDescription(true);
    } else {
      setDescription(val);
      setIsValidDescription(false);
    }
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
              navigation.goBack();
            }}>
            <Image
              source={icons.back}
              style={styles.button_back}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.text_title}>Tạo bài viết</Text>
        </View>
        {edited ? (
          <TouchableOpacity
            style={styles.button_post_onEdit}
            onPress={() => {
              handleCreateProperty();
            }}>
            <Text style={styles.text_button_post_onEdit}>Đăng</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button_post}>
            <Text style={styles.text_button_post}>Đăng</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content_container}>
        <View style={styles.sale_method_container}>
          <TouchableOpacity
            activeOpacity={false}
            style={
              saleMethod == 'for_sale'
                ? styles.button_sale_active
                : styles.button_sale_inactive
            }
            onPress={() => {
              setSaleMethod('for_sale');
            }}>
            <Text
              style={
                saleMethod == 'for_sale'
                  ? styles.text_button_post_onEdit
                  : styles.text_button_post
              }>
              Mua bán
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={false}
            style={
              saleMethod == 'for_sale'
                ? styles.button_rent_inactive
                : styles.button_rent_active
            }
            onPress={() => {
              setSaleMethod('for_rent');
            }}>
            <Text
              style={
                saleMethod == 'for_sale'
                  ? styles.text_button_post
                  : styles.text_button_post_onEdit
              }>
              Cho thuê
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: SIZES.small}}>
          <View style={[styles.action, {marginRight: SIZES.padding / 2}]}>
            <Image
              source={icons.area}
              style={styles.icons_property}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Diện tích"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => {
                text_AreaChange(val);
              }}
              style={styles.text_input}></TextInput>
            <Text
              style={{
                color: COLORS.darkgray,
                ...FONTS.body4,
                marginRight: SIZES.small,
              }}>
              m²
            </Text>
            {isValidArea ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : (
              <View style={{width: 20}}></View>
            )}
          </View>
          <View style={[styles.action, {marginLeft: SIZES.padding / 2}]}>
            <Image
              source={icons.price}
              style={styles.icons_property}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Giá"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => {
                text_PriceChange(val);
              }}
              style={styles.text_input}></TextInput>
            <Text
              style={{
                color: COLORS.darkgray,
                ...FONTS.body4,
                marginRight: SIZES.small,
              }}>
              triệu
            </Text>
            {isValidPrice ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : (
              <View style={{width: 20}}></View>
            )}
          </View>
        </View>
        <View
          style={{
            height: 50,
            marginTop: SIZES.small,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={[styles.action, {height: 50}]}>
            <Image
              source={icons.address}
              style={styles.icons_property}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Địa chỉ"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => {
                text_AddressChange(val);
              }}
              style={styles.text_input}></TextInput>
            {isValidAddress ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : null}
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: SIZES.small,
            }}
            onPress={() => {
              navigation.navigate('Coordinate');
            }}>
            <Image
              source={icons.coordinate}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{height: 50, marginTop: SIZES.small}}>
          <View style={[styles.action]}>
            <Image
              source={icons.title}
              style={styles.icons_property}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Tiêu đề"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              multiline
              onChangeText={(val) => {
                text_TitleChange(val);
              }}
              style={styles.text_input}></TextInput>
            {isValidTitle ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </View>
        <View style={{height: 230, marginTop: SIZES.small}}>
          <View style={styles.action_content}>
            <TextInput
              placeholder="Nội dung bài đăng ..."
              placeholderTextColor="#666666"
              autoCapitalize="none"
              multiline
              onChangeText={(val) => {
                text_DescriptionChange(val);
              }}
              style={styles.text_input_content}></TextInput>
            {isValidDescription ? (
              <Image
                source={icons.checkmark}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'green',
                  marginTop: SIZES.base,
                }}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </View>
        <View style={{height: 35, marginTop: SIZES.small}}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Image
              source={icons.image}
              style={{width: 35, height: 35}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body3,
                marginLeft: SIZES.base,
              }}>
              Ảnh
            </Text>
          </TouchableOpacity>
        </View>
        {/* Modal Thong bao  */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View
              style={{
                padding: SIZES.padding,
                alignItems: 'center',
                height: 100,
                width: 200,
                borderRadius: 10,
                justifyContent: 'space-between',
                backgroundColor: '#FFF',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              {submitSuccess ? (
                <>
                  <Text style={{color: 'green', ...FONTS.h3}}>Thành công!</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      navigation.goBack();
                    }}
                    style={{
                      height: 40,
                      width: 100,
                      backgroundColor: 'green',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{color: COLORS.white, ...FONTS.body3}}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={{color: 'red', ...FONTS.h3}}>Đã xãy ra lỗi</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    style={{
                      height: 40,
                      width: 100,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text style={{color: COLORS.white, ...FONTS.body3}}>
                      CLOSE
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
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
    justifyContent: 'space-between',
  },
  button_back: {height: 22, width: 22},
  text_title: {
    color: COLORS.black,
    ...FONTS.body2,
    marginLeft: 2 * SIZES.padding,
  },
  button_post: {
    width: 80,
    backgroundColor: '#e5e6eb',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text_button_post: {color: '#d2d3d9', ...FONTS.body3},
  button_post_onEdit: {
    width: 80,
    backgroundColor: '#00AEDD',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text_button_post_onEdit: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  content_container: {
    flex: 1,
    padding: SIZES.padding,
  },
  button_sale_active: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AEDD',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button_sale_inactive: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e6eb',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  button_rent_inactive: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e6eb',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  button_rent_active: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00AEDD',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  sale_method_container: {flexDirection: 'row'},
  action: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderColor: COLORS.darkgray,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
  },
  icons_property: {
    width: 27,
    height: 27,
  },
  text_input: {
    flex: 1,
    paddingLeft: 10,
    color: COLORS.black,
    ...FONTS.body3,
    marginBottom: -2,
  },
  action_content: {
    flex: 1,
    borderRadius: 5,
    borderColor: COLORS.darkgray,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  text_input_content: {
    flex: 1,
    color: COLORS.black,
    ...FONTS.body3,
    marginTop: -5,
  },
});

export default Posting;
