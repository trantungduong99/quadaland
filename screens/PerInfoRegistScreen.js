import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {changePassword, signIn} from '../services/authService';
import {SIGN_IN} from '../actions/actionTypes';
import {useAuthDispatch} from '../contexts/authContext';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {updateCustomer} from '../services/authService';
import asyncStorage from '@react-native-community/async-storage';

const PerInfoRegistScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const dispatch = useAuthDispatch();

  const {username, password} = route.params;
  const signInUser = async (values) => {
    const {email, password} = values;
    setIsLoading(true);
    signIn(email, password)
      .then((r) => {
        console.log(r);
        dispatch({type: SIGN_IN, token: r.token});
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSignInUser = async (values) => {
    await signInUser(values);
  };
  const textFullNameChange = (val) => {
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
  const textEmailChange = (val) => {
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
  const textAddressChange = (val) => {
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
  const textPhoneChange = (val) => {
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
  const handleUpdateCustomer = async (values) => {
    const {fullName, phone, address, email} = values;
    if (
      isValidFullName &&
      isValidAddress &&
      isValidEmail &&
      isValidPhone &&
      fullName &&
      phone &&
      address &&
      email
    ) {
      setIsLoading(true);
      signIn(username, password)
        .then((r) => {
          console.log(r);
          updateCustomer(fullName, phone, address, email)
            .then((res) => {
              if (res.data.updated_at) {
                console.log('Da thuc hien update');
                dispatch({type: SIGN_IN, token: r.token});
              } else {
                console.log('update that bai ', res);
              }
            })
            .catch((e) => {
              console.log('loi khi update ', e);
              handleValidAddress(address);
              handleValidEmail(email);
              handleValidFullName(fullName);
              handleValidPhone(phone);
            });
        })
        .catch((e) => {
          setIsLoading(false);
          console.log('loi khi dang nhap ', e);
        });
    } else {
      handleValidAddress(address);
      handleValidEmail(email);
      handleValidFullName(fullName);
      handleValidPhone(phone);
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00AEDD',
          }}>
          <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
          <Image
            source={images.supportTeam}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
      ) : (
        <>
          <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
          <View style={styles.header}>
            <Image
              source={images.supportTeam}
              style={{height: '100%', width: '100%'}}
              resizeMode="contain"
            />
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>PERSONAL INFORMATION</Text>
            </View>
            {/* FULL NAME */}
            <Text style={styles.text_footer}>Full name</Text>
            <View style={styles.action}>
              <Image
                source={icons.user}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Full name"
                value={fullName}
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => {
                  textFullNameChange(val);
                }}
                onEndEditing={(e) => {
                  handleValidFullName(e.nativeEvent.text);
                }}
                style={styles.TextInput}
              />
            </View>
            {isValidFullName ? (
              <View style={{height: 22}}></View>
            ) : (
              <Text style={styles.errMsg}>
                Full name must be longer than or equal to 5 characters.
              </Text>
            )}
            {/* PHONE  */}
            <Text style={styles.text_footer}>Phone</Text>
            <View style={styles.action}>
              <Image
                source={icons.call}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Phone"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => {
                  textPhoneChange(val);
                }}
                onEndEditing={(e) => {
                  handleValidPhone(e.nativeEvent.text);
                }}
                style={styles.TextInput}
              />
            </View>
            {isValidPhone ? (
              <View style={{height: 22}}></View>
            ) : (
              <Text style={styles.errMsg}>
                Phone must be 8-12 characters long.
              </Text>
            )}
            {/* ADDRESS  */}
            <Text style={styles.text_footer}>Address</Text>
            <View style={styles.action}>
              <Image
                source={icons.pin}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Address"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => {
                  textAddressChange(val);
                }}
                onEndEditing={(e) => {
                  handleValidAddress(e.nativeEvent.text);
                }}
                style={styles.TextInput}
              />
            </View>
            {isValidAddress ? (
              <View style={{height: 22}}></View>
            ) : (
              <Text style={styles.errMsg}>
                Address must be longer than or equal to 20 characters.
              </Text>
            )}
            {/* EMAIL  */}
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <Image
                source={icons.mail}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => {
                  textEmailChange(val);
                }}
                onEndEditing={(e) => {
                  handleValidEmail(e.nativeEvent.text);
                }}
                style={styles.TextInput}
              />
            </View>
            {isValidEmail ? (
              <View style={{height: 22}}></View>
            ) : (
              <Text style={styles.errMsg}>Email must be an email.</Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonConfirm}
                onPress={() => {
                  handleUpdateCustomer({
                    fullName: fullName,
                    phone: phone,
                    address: address,
                    email: email,
                  });
                }}>
                <Text style={styles.text_confirm}>Confirm</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 8,
                }}
                onPress={() => {
                  handleSignInUser({email: username, password: password});
                }}>
                <Text style={{color: '#00AEDD', ...FONTS.body3}}>Skip</Text>
                <Image
                  source={icons.right}
                  style={{width: 14, height: 14, tintColor: '#00AEDD'}}
                  resizeMode="contain"
                />
                <Image
                  source={icons.right}
                  style={{width: 14, height: 14, tintColor: '#00AEDD'}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEDD',
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: SIZES.padding,
  },
  footer: {
    flex: 4,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: SIZES.padding,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: COLORS.black,
    ...FONTS.h3,
  },
  text_footer: {
    color: '#05375a',
    fontWeight: 'bold',
    ...FONTS.body4,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    alignItems: 'flex-end',
    paddingBottom: 3,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    marginBottom: -18,
    ...FONTS.body4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonConfirm: {
    width: 120,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#00AEDD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  text_confirm: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  errMsg: {
    color: '#FF0000',
    ...FONTS.body5,
  },
});
export default PerInfoRegistScreen;
