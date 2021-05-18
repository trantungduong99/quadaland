import React, {useState, useRef, useEffect} from 'react';
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
import {updateCustomer, signIn, readMyProfile} from '../services/authService';
import {useAuthState} from '../contexts/authContext';

const MyProfile = ({navigation}) => {
  const {role} = useAuthState();
  const [fullnameText, setFullName] = useState(null);
  const [phoneText, setPhone] = useState(null);
  const [emailText, setEmail] = useState(null);
  const [addressText, setAddress] = useState(null);
  const [facebookText, setFacebook] = useState(null);
  const [instagramText, setInstagram] = useState(null);
  const [twitterText, setTwitter] = useState(null);
  const [checkEditFullName, setCheckEditFullName] = useState(false);
  const [checkEditPhone, setCheckEditPhone] = useState(false);
  const [checkEditEmail, setCheckEditEmail] = useState(false);
  const [checkEditAddress, setCheckEditAddress] = useState(false);
  const [checkEditFacebook, setCheckEditFacebook] = useState(false);
  const [checkEditInstagram, setCheckEditInstagram] = useState(false);
  const [checkEditTwitter, setCheckEditTwitter] = useState(false);
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidFaceBook, setIsValidFacebook] = useState(true);
  const [isValidInstagram, setIsValidInstagram] = useState(true);
  const [isValidTwitter, setIsValidTwitter] = useState(true);
  const ref_FullName = useRef();
  const ref_Phone = useRef();
  const ref_Email = useRef();
  const ref_Address = useRef();
  const ref_Facebook = useRef();
  const ref_Twitter = useRef();
  const ref_Instagram = useRef();
  useEffect(() => {
    console.log('role :', role);
    readMyProfile()
      .then((r) => {
        if (role == 'customer') {
          const {full_name, phone, email, address} = r.data;
          setFullName(full_name), setPhone(phone), setEmail(email);
          setAddress(address);
        }
        if (role == 'company') {
          const {
            full_name,
            phone,
            email,
            address,
            facebook,
            instagram,
            twitter,
          } = r.data;
          setFullName(full_name);
          setPhone(phone);
          setEmail(email);
          setAddress(address);
          setFacebook(facebook);
          setInstagram(instagram);
          setTwitter(twitter);
        }
      })
      .catch((e) => {
        console.log('error in MyProfilejs', e);
      });
  }, []);
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
    if (val.trim().length >= 20) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  };
  const text_FacebookChange = (val) => {
    if (val.trim().length >= 5) {
      setFacebook(val);
      setIsValidFacebook(true);
    } else {
      setFacebook(val);
      setIsValidFacebook(false);
    }
  };
  const handleValidFacebook = (val) => {
    if (val.trim().length >= 5) {
      setIsValidFacebook(true);
    } else {
      setIsValidFacebook(false);
    }
  };
  const text_InstagramChange = (val) => {
    if (val.trim().length >= 5) {
      setInstagram(val);
      setIsValidInstagram(true);
    } else {
      setInstagram(val);
      setIsValidInstagram(false);
    }
  };
  const handleValidInstagram = (val) => {
    if (val.trim().length >= 5) {
      setIsValidInstagram(true);
    } else {
      setIsValidInstagram(false);
    }
  };
  const text_TwitterChange = (val) => {
    if (val.trim().length >= 5) {
      setTwitter(val);
      setIsValidTwitter(true);
    } else {
      setTwitter(val);
      setIsValidTwitter(false);
    }
  };
  const handleValidTwitter = (val) => {
    if (val.trim().length >= 5) {
      setIsValidTwitter(true);
    } else {
      setIsValidTwitter(false);
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
    if (x == 'facebook') {
      await setCheckEditFacebook(true);
      ref_Facebook.current.focus();
    }
    if (x == 'instagram') {
      await setCheckEditInstagram(true);
      ref_Instagram.current.focus();
    }
    if (x == 'twitter') {
      await setCheckEditTwitter(true);
      ref_Twitter.current.focus();
    }
  };
  const handleUpdateMyProfile = async () => {
    if (role == 'customer') {
      const values = {
        full_name: fullnameText,
        phone: phoneText,
        address: addressText,
        email: emailText,
      };
      // console.log(values);
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
        updateCustomer(values)
          .then((response) => {
            if (response.data.updated_at) {
              setFullName(response.data.full_name);
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
    }
    if (role == 'company') {
      const values = {
        full_name: fullnameText,
        phone: phoneText,
        address: addressText,
        email: emailText,
        facebook: facebookText,
        instagram: instagramText,
        twitter: twitterText,
      };
      // console.log(values);
      updateCustomer(values)
        .then((response) => {
          if (response.data.updated_at) {
            setFullName(response.data.full_name);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setFacebook(response.data.facebook);
            setInstagram(response.data.instagram);
            setTwitter(response.data.twitter);
            setCheckEditFullName(false);
            setCheckEditPhone(false);
            setCheckEditEmail(false);
            setCheckEditAddress(false);
            setCheckEditFacebook(false);
            setCheckEditInstagram(false);
            setCheckEditTwitter(false);
          } else {
            console.log('error update');
          }
        })
        .catch((e) => {
          console.log(e);
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
              multiline={true}
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
              multiline={true}
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
              multiline={true}
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
        {role == 'company' && (
          <>
            <View
              style={{
                paddingTop: SIZES.padding,
                paddingHorizontal: SIZES.padding,
              }}>
              <View style={styles.action}>
                <Image
                  source={icons.fb}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Facebook"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  editable={checkEditFacebook}
                  multiline={true}
                  ref={ref_Facebook}
                  value={facebookText}
                  onChangeText={(val) => {
                    text_FacebookChange(val);
                  }}
                  onEndEditing={(e) => {
                    handleValidFacebook(e.nativeEvent.text);
                  }}
                  style={
                    checkEditFacebook
                      ? styles.text_inputOnEditing
                      : styles.text_input
                  }></TextInput>
                <TouchableOpacity
                  onPress={() => {
                    handleClick('facebook');
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
              style={{
                paddingTop: SIZES.padding,
                paddingHorizontal: SIZES.padding,
              }}>
              <View style={styles.action}>
                <Image
                  source={icons.instagram}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Instagram"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  editable={checkEditInstagram}
                  ref={ref_Instagram}
                  value={instagramText}
                  multiline={true}
                  onChangeText={(val) => {
                    text_InstagramChange(val);
                  }}
                  onEndEditing={(e) => {
                    handleValidInstagram(e.nativeEvent.text);
                  }}
                  style={
                    checkEditInstagram
                      ? styles.text_inputOnEditing
                      : styles.text_input
                  }></TextInput>
                <TouchableOpacity
                  onPress={() => {
                    handleClick('instagram');
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
              style={{
                paddingTop: SIZES.padding,
                paddingHorizontal: SIZES.padding,
              }}>
              <View style={styles.action}>
                <Image
                  source={icons.twitter}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <TextInput
                  placeholder="Twitter"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  editable={checkEditTwitter}
                  ref={ref_Twitter}
                  value={twitterText}
                  multiline={true}
                  onChangeText={(val) => {
                    text_TwitterChange(val);
                  }}
                  onEndEditing={(e) => {
                    handleValidTwitter(e.nativeEvent.text);
                  }}
                  style={
                    checkEditTwitter
                      ? styles.text_inputOnEditing
                      : styles.text_input
                  }></TextInput>
                <TouchableOpacity
                  onPress={() => {
                    handleClick('twitter');
                  }}>
                  <Image
                    source={icons.edit}
                    style={{height: 20, width: 20, tintColor: 'green'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
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
        checkEditPhone ||
        checkEditFacebook ||
        checkEditInstagram ||
        checkEditTwitter ? (
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
                handleUpdateMyProfile();
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
    height: 50,
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    justifyContent: 'flex-start',
  },
  icon: {height: 25, width: 25},
  text_input: {flex: 1, paddingLeft: 10, color: '#666666', ...FONTS.body3},
  text_inputOnEditing: {
    flex: 1,
    paddingLeft: 10,
    color: COLORS.black,
    ...FONTS.body3,
  },
});
export default MyProfile;
