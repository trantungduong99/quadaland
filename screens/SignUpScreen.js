import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      check_textInputChange: false,
      check_textPhoneNumberChange: false,
      check_textEmailChange: false,
      secureTextEntry: true,
      secureTextConfirmEntry: true,
      isValidUser: true,
      isValidPassword: true,
      isValidPhoneNumber: true,
      isValidEmail: true,
      isValidPasswordConfirm: true,
    };
    console.log(props);
    console.log(this.state);
  }
  textInputChange = (val) => {
    if (val.trim().length >= 4) {
      this.setState({
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      this.setState({
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  textPhoneNumberChange = (val) => {
    if (val.trim().length >= 10) {
      this.setState({
        phoneNumber: val,
        check_textPhoneNumberChange: true,
        isValidPhoneNumber: true,
      });
    } else {
      this.setState({
        phoneNumber: val,
        check_textPhoneNumberChange: false,
        isValidPhoneNumber: false,
      });
    }
  };
  textEmailChange = (val) => {
    if (val.endsWith('@gmail.com')) {
      this.setState({
        email: val,
        check_textEmailChange: true,
        isValidEmail: true,
      });
    } else {
      this.setState({
        email: val,
        check_textEmailChange: false,
        isValidEmail: false,
      });
    }
  };

  handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      this.setState({isValidUser: true});
    } else {
      this.setState({isValidUser: false});
    }
  };
  handleValidPhoneNumber = (val) => {
    if (val.trim().length >= 10) {
      this.setState({isValidPhoneNumber: true});
    } else {
      this.setState({isValidPhoneNumber: false});
    }
  };
  handleValidEmail = (val) => {
    if (val.endsWith('@gmail.com')) {
      this.setState({isValidEmail: true});
    } else {
      this.setState({isValidEmail: false});
    }
  };
  handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      this.setState({password: val, isValidPassword: true});
    } else {
      this.setState({password: val, isValidPassword: false});
    }
  };
  handlePasswordConfirmChange = (val) => {
    if (val == this.state.password) {
      this.setState({passwordConfirm: val, isValidPasswordConfirm: true});
    } else {
      this.setState({passwordConfirm: val, isValidPasswordConfirm: false});
    }
  };

  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
        <View style={styles.header}>
          <Image
            source={images.supportTeam}
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.text_footer}>Full Name</Text>
          <View style={styles.action}>
            <Image
              source={icons.user}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              style={styles.TextInput}
              onChangeText={(val) => {
                this.textInputChange(val);
              }}
              onEndEditing={(e) => {
                this.handleValidUser(e.nativeEvent.text);
              }}
            />

            {this.state.check_textInputChange ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : null}
          </View>
          {this.state.isValidUser ? (
            <View style={{height: 22}}></View>
          ) : (
            <Text style={styles.errMsg}>
              Fullname must be 4 characters long.
            </Text>
          )}
          <Text style={styles.text_footer}>Phone number</Text>
          <View style={styles.action}>
            <Image
              source={icons.call}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Your Phone Number"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              style={styles.TextInput}
              onChangeText={(val) => {
                this.textPhoneNumberChange(val);
              }}
              onEndEditing={(e) => {
                this.handleValidPhoneNumber(e.nativeEvent.text);
              }}
            />

            {this.state.check_textPhoneNumberChange ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : null}
          </View>
          {this.state.isValidPhoneNumber ? (
            <View style={{height: 22}}></View>
          ) : (
            <Text style={styles.errMsg}>
              Phone number must be 10 characters long.
            </Text>
          )}
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Image
              source={icons.mail}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Enter your Email"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              style={styles.TextInput}
              onChangeText={(val) => {
                this.textEmailChange(val);
              }}
              onEndEditing={(e) => {
                this.handleValidEmail(e.nativeEvent.text);
              }}
            />

            {this.state.check_textEmailChange ? (
              <Image
                source={icons.checkmark}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            ) : null}
          </View>
          {this.state.isValidEmail ? (
            <View style={{height: 22}}></View>
          ) : (
            <Text style={styles.errMsg}>
              Email must be in the correct format.(abd@domain.com)
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
              placeholder="Enter your Password"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              secureTextEntry={this.state.secureTextEntry}
              style={styles.TextInput}
              onChangeText={(val) => {
                this.handlePasswordChange(val);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({secureTextEntry: !this.state.secureTextEntry});
              }}>
              {this.state.secureTextEntry ? (
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

          {this.state.isValidPassword ? (
            <View style={{height: 22, width: 30}}></View>
          ) : (
            <Text style={styles.errMsg}>
              Password must be 8 characters long.
            </Text>
          )}
          <Text style={[styles.text_footer, {marginTop: 2}]}>
            Confirm Password
          </Text>
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
              secureTextEntry={this.state.secureTextConfirmEntry}
              style={styles.TextInput}
              onChangeText={(val) => {
                this.handlePasswordConfirmChange(val);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  secureTextConfirmEntry: !this.state.secureTextConfirmEntry,
                });
              }}>
              {this.state.secureTextConfirmEntry ? (
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

          {this.state.isValidPasswordConfirm ? (
            <View style={{height: 22, width: 30}}></View>
          ) : (
            <Text style={styles.errMsg}>
              Comfirm password must be same as password.
            </Text>
          )}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                console.log(this.state);
              }}>
              <Text style={styles.textSignIn}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUp}>
            <TouchableOpacity>
              <Image
                source={icons.google}
                resizeMode="contain"
                style={{width: 25, height: 25, marginRight: 25}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.facebook}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

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
    flex: 11,
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
