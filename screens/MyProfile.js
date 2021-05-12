import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import {icons, images, COLORS, FONTS, SIZES, API} from '../constants';
import {updateCustomer, signIn} from '../services/authService';

const MyProfile = ({route, navigation}) => {
  const {full_name, phone, email, address} = route.params;
  const [fullnameText, setFullName] = useState(full_name);
  const [phoneText, setPhone] = useState(phone);
  const [emailText, setEmail] = useState(email);
  const [addressText, setAddress] = useState(address);
  const [displayName, setDisplayName] = useState(full_name);
  const [checkEditFullName, setCheckEditFullName] = useState(false);
  const [checkEditPhone, setCheckEditPhone] = useState(false);
  const [checkEditEmail, setCheckEditEmail] = useState(false);
  const [checkEditAddress, setCheckEditAddress] = useState(false);
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const ref_FullName = useRef();
  const ref_Phone = useRef();
  const ref_Email = useRef();
  const ref_Address = useRef();
  const text_FullNameChange = (val) => {
    if (val.trim().length >= 5) {
      setFullName(val);
      setIsValidFullName(true);
    } else {
      setFullName(val);
      setIsValidFullName(false);
    }
  };
  const handleValidFullName = (val) => {
    if (val.trim().length >= 5) {
      setIsValidFullName(true);
    } else {
      setIsValidFullName(false);
    }
  };
  const text_PhoneChange = (val) => {
    if (val.trim().length >= 8 && val.trim().length <= 12) {
      setPhone(val);
      setIsValidPhone(true);
    } else {
      setPhone(val);
      setIsValidPhone(false);
    }
  };
  const handleValidPhone = (val) => {
    if (val.trim().length >= 8 && val.trim().length <= 12) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
  };
  const text_EmailChange = (val) => {
    if (val.endsWith('@gmail.com')) {
      setEmail(val);
      setIsValidEmail(true);
    } else {
      setEmail(val);
      setIsValidEmail(false);
    }
  };
  const handleValidEmail = (val) => {
    if (val.endsWith('@gmail.com')) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  const text_AddressChange = (val) => {
    if (val.trim().length >= 20) {
      setAddress(val);
      setIsValidAddress(true);
    } else {
      setAddress(val);
      setIsValidAddress(false);
    }
  };
  const handleValidAddress = (val) => {
    if (val.trim().length >= 5) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  };

  const handleClick = async (x) => {
    if (x == 'fullname') {
      await setCheckEditFullName(true);
      ref_FullName.current.focus();
    }
    if (x == 'phone') {
      await setCheckEditPhone(true);
      ref_Phone.current.focus();
    }
    if (x == 'email') {
      await setCheckEditEmail(true);
      ref_Email.current.focus();
    }
    if (x == 'address') {
      await setCheckEditAddress(true);
      ref_Address.current.focus();
    }
  };
  const handleUpdateMyProfile = async (values) => {
    const {full_name, phone, email, address} = values;
    console.log(values);
    if (
      isValidFullName &&
      isValidPhone &&
      isValidEmail &&
      isValidAddress &&
      fullnameText &&
      phoneText &&
      emailText &&
      addressText
    ) {
      updateCustomer(full_name, phone, address, email)
        .then((response) => {
          if (response.data.updated_at) {
            setFullName(response.data.full_name);
            setDisplayName(response.data.full_name);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setCheckEditFullName(false);
            setCheckEditPhone(false);
            setCheckEditEmail(false);
            setCheckEditAddress(false);
          } else {
            console.log('error update');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
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
        <Text style={styles.text_title}>Thông tin tài khoản</Text>
      </View>
      <View style={styles.profile_container}>
        <View style={styles.image_name_container}>
          <View style={styles.image_container}>
            <Image
              source={images.avatar}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.name_container}>
            <Text style={styles.text_name}>{displayName}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 2,
              backgroundColor: COLORS.darkgray,
              width: SIZES.width * 0.8,
            }}></View>
        </View>
        <View
          style={{paddingTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
          <View style={styles.action}>
            <Image
              source={icons.user}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextInput
              placeholder="FullName"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              editable={checkEditFullName}
              ref={ref_FullName}
              value={fullnameText}
              onChangeText={(val) => {
                text_FullNameChange(val);
              }}
              onEndEditing={(e) => {
                handleValidFullName(e.nativeEvent.text);
              }}
              style={
                checkEditFullName
                  ? styles.text_inputOnEditing
                  : styles.text_input
              }></TextInput>
            <TouchableOpacity
              onPress={() => {
                handleClick('fullname');
              }}>
              <Image
                source={icons.edit}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{paddingTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
          <View style={styles.action}>
            <Image
              source={icons.call}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              editable={checkEditPhone}
              ref={ref_Phone}
              value={phoneText}
              onChangeText={(val) => {
                text_PhoneChange(val);
              }}
              onEndEditing={(e) => {
                handleValidPhone(e.nativeEvent.text);
              }}
              style={
                checkEditPhone ? styles.text_inputOnEditing : styles.text_input
              }></TextInput>
            <TouchableOpacity
              onPress={() => {
                handleClick('phone');
              }}>
              <Image
                source={icons.edit}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{paddingTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
          <View style={styles.action}>
            <Image
              source={icons.mail}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              editable={checkEditEmail}
              ref={ref_Email}
              value={emailText}
              onChangeText={(val) => {
                text_EmailChange(val);
              }}
              onEndEditing={(e) => {
                handleValidEmail(e.nativeEvent.text);
              }}
              style={
                checkEditEmail ? styles.text_inputOnEditing : styles.text_input
              }></TextInput>
            <TouchableOpacity
              onPress={() => {
                handleClick('email');
              }}>
              <Image
                source={icons.edit}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{paddingTop: SIZES.padding, paddingHorizontal: SIZES.padding}}>
          <View
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.darkgray,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
              justifyContent: 'flex-start',
            }}>
            <Image
              source={icons.pin}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Address"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              multiline={!checkEditAddress}
              editable={checkEditAddress}
              ref={ref_Address}
              onChangeText={(val) => {
                text_AddressChange(val);
              }}
              onEndEditing={(e) => {
                handleValidAddress(e.nativeEvent.text);
              }}
              value={addressText}
              style={
                checkEditAddress
                  ? styles.text_inputOnEditing
                  : styles.text_input
              }></TextInput>
            <TouchableOpacity
              onPress={() => {
                handleClick('address');
              }}>
              <Image
                source={icons.edit}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {checkEditAddress ||
        checkEditEmail ||
        checkEditFullName ||
        checkEditPhone ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              padding: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{
                height: 38,
                width: 150,
                borderRadius: 5,
                backgroundColor: '#00AEDD',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}
              onPress={() => {
                handleUpdateMyProfile({
                  full_name: fullnameText,
                  phone: phoneText,
                  email: emailText,
                  address: addressText,
                });
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h4}}>
                Lưu thay đổi
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
  profile_container: {
    flex: 1,
  },
  image_name_container: {
    height: 140,
    alignItems: 'center',
    paddingTop: SIZES.padding,
  },
  image_container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.darkgray,
  },
  name_container: {marginTop: SIZES.padding, justifyContent: 'center'},
  text_name: {color: COLORS.black, ...FONTS.h2},
  action: {
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'flex-start',
  },
  icon: {height: 25, width: 25},
  text_input: {flex: 1, paddingLeft: 10, color: '#00AEDD', ...FONTS.body3},
  text_inputOnEditing: {
    flex: 1,
    paddingLeft: 10,
    color: COLORS.black,
    ...FONTS.body3,
  },
});
export default MyProfile;
