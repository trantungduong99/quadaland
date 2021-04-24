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
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import LinearGradient from '../components/LinearGradient';

class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
    };
    console.log(props);
    console.log(this.state);
  }
  textInputChange = (val) => {
    if (val.trim().length >= 10) {
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

  handleValidUser = (val) => {
    if (val.trim().length >= 10) {
      this.setState({isValidUser: true});
    } else {
      this.setState({isValidUser: false});
    }
  };
  handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      this.setState({password: val, isValidPassword: true});
    } else {
      this.setState({password: val, isValidPassword: false});
    }
  };
  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#00AEDD" barStyle="light-content" />
        <View style={styles.header}>
          <Image source={images.supportTeam} resizeMode="contain" style={{width:"100%",height:"90%"}}/>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
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
              Username must be 10 characters long.
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
              placeholder="Your Password"
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
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {this.state.isValidPassword ? (
              <View style={{height: 22, width: 30}}></View>
            ) : (
              <Text style={styles.errMsg}>
                Password must be 8 characters long.
              </Text>
            )}
            <TouchableOpacity>
              <Text style={styles.text2}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}>
              <Text style={styles.textSignIn}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUp}>
            <Text style={[styles.text1, {marginRight: SIZES.base}]}>
              Do you have an account?
            </Text>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("SignUpScreen")}}>
              <Text style={styles.text2}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUp}>
            <Image
              source={icons.google}
              resizeMode="contain"
              style={{width: 25, height: 25,marginRight:25}}
            />
            <Image
              source={icons.facebook}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEDD',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom:SIZES.padding
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
    ...FONTS.h4,
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    marginBottom: -18,
    ...FONTS.body3,
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
