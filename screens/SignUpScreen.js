import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import * as Animatable from 'react-native-animatable';
import {signUp} from '../services/authService';
import {useAuthDispatch} from '../contexts/authContext';
import {SIGN_IN} from '../actions/actionTypes';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [check_textInputChange, setCheckTextInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(true);

  const dispatch = useAuthDispatch();

  const textInputChange = (val) => {
    if (val.trim().length >= 8) {
      setUsername(val);
      setCheckTextInputChange(true);
      setIsValidUser(true);
    } else {
      setUsername(val);
      setCheckTextInputChange(false);
      setIsValidUser(false);
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 8) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
    }
  };
  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setPassword(val);
      setIsValidPassword(true);
    } else {
      setPassword(val);
      setIsValidPassword(false);
    }
  };
  const handlePasswordConfirmChange =(val)=>{
    if(val==password){
      setPasswordConfirm(val);
      setIsValidPasswordConfirm(true)
    }else{
      setPasswordConfirm(val);
      setIsValidPasswordConfirm(false)
    }
  }
  const signUpUser = async (values) => {
    const {email, password} = values;
    setSignUpLoading(true);
    signUp(email, password)
      .then((response) => {
        if (response.success == true) {
          setSignUpSuccess(true);
          setSignUpLoading(false);
        }
      })
      .catch((e) => {
        console.log('Error in signUpUser at autService.js:84 ', e);
        setSignUpLoading(false);
      })
      .finally(() => {
        if(signUpSuccess){
          console.log('Thực hiện navigate sang trang đăng kí thông tin cá nhân');
          navigation.navigate("PerInfoRegistScreen",{username:email, password:password})
        }
      });
  };
  const handleSignUp = async (values) => {
    if (isValidPassword && isValidUser&&password&&username) {
      await signUpUser(values);
    } else {
      return;
    }
  };
  return (
    <View style={styles.container}>
      {signUpLoading?(<View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00AEDD',
          }}>
          <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
          <Image
            source={images.supportTeam}
            style={{height: "100%", width: "100%"}}
            resizeMode="contain"
          />
        </View>):(<>
          <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
          <View style={styles.header}>
            <Image
              source={images.supportTeam}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
              <Image
                source={icons.user}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Username"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                style={styles.TextInput}
                onChangeText={(val) => {
                  textInputChange(val);
                }}
                onEndEditing={(e) => {
                  handleValidUser(e.nativeEvent.text);
                }}
              />

              {check_textInputChange ? (
                <Image
                  source={icons.checkmark}
                  style={{height: 20, width: 20, tintColor: 'green'}}
                  resizeMode="contain"
                />
              ) : null}
            </View>
            {isValidUser ? (
              <View style={{height: 22}}></View>
            ) : (
              <Text style={styles.errMsg}>
                Username must be 8 characters long.
              </Text>
            )}
            <Text style={[styles.text_footer, {marginTop: 2}]}>Password</Text>
            <View style={styles.action}>
              <Image
                source={icons.padlock}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                style={styles.TextInput}
                onChangeText={(val) => {
                  handlePasswordChange(val);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setSecureTextEntry(!secureTextEntry);
                }}>
                {secureTextEntry ? (
                  <Image
                    source={icons.eye_off}
                    style={{height: 20, width: 20, tintColor: 'gray'}}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={icons.eye}
                    style={{height: 20, width: 20, tintColor: 'gray'}}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              {isValidPassword ? (
                <View style={{height: 22, width: 30}}></View>
              ) : (
                <Text style={styles.errMsg}>
                  Password must be 8 characters long.
                </Text>
              )}
            </View>
            <Text style={[styles.text_footer, {marginTop: 2}]}>Confirm Password</Text>
            <View style={styles.action}>
              <Image
                source={icons.padlock}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                secureTextEntry={secureTextEntryConfirm}
                style={styles.TextInput}
                onChangeText={(val) => {
                  handlePasswordConfirmChange(val);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setSecureTextEntryConfirm(!secureTextEntryConfirm);
                }}>
                {secureTextEntryConfirm ? (
                  <Image
                    source={icons.eye_off}
                    style={{height: 20, width: 20, tintColor: 'gray'}}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={icons.eye}
                    style={{height: 20, width: 20, tintColor: 'gray'}}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              {isValidPasswordConfirm ? (
                <View style={{height: 22, width: 30}}></View>
              ) : (
                <Text style={styles.errMsg}>
                Password & Confirm Password must be same.
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.errMsg}>{signUpSuccess==false?"Đăng kí thất bại! Xin vui lòng thử lại.":""}</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={()=>{handleSignUp({email:username,password:passwordConfirm})}}>
                <Text style={styles.textSignIn}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUp}>
              <Text style={[styles.text1, {marginRight: SIZES.base}]}>
                Have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUpScreen');
                }}>
                <Text style={styles.text2}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </>)}
    </View>
  );
  // }
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEDD',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: SIZES.padding,
  },
  text_header: {
    color: COLORS.black,
    ...FONTS.h2,
  },
  footer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_footer: {
    color: '#05375a',
    fontWeight: 'bold',
    ...FONTS.body4,
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
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
  errMsg: {
    color: '#FF0000',
    ...FONTS.body5,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ADEE',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textSignIn: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  text1: {
    color: 'gray',
    ...FONTS.body4,
  },
  text2: {
    color: '#00AEDD',
    ...FONTS.body4,
  },
  signUp: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
