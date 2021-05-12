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

const MyProfile = ({navigation}) => {
  const [fullName, setFullName] = useState('Hồ Lê Huy');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [checkEditFullName, setCheckEditFullName] = useState(false);
  const [isValidFullName, setIsValidFullName] = useState(true);
  const ref_FullName = useRef();
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
            <Text style={styles.text_name}>Hồ Lê Huy</Text>
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
              ref={ref_FullName}
              value={fullName}
              onChangeText={(val) => {
                text_FullNameChange(val);
              }}
              onEndEditing={(e) => {
                handleValidFullName(e.nativeEvent.text);
              }}
              style={styles.text_input}></TextInput>
            <TouchableOpacity
              onPress={() => {
                ref_FullName.current.focus();
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
              style={styles.text_input}></TextInput>
            <TouchableOpacity>
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
              style={styles.text_input}></TextInput>
            <TouchableOpacity>
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
              multiline={true}
              style={styles.text_input}></TextInput>
            <TouchableOpacity>
              <Image
                source={icons.edit}
                style={{height: 20, width: 20, tintColor: 'green'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
  profile_container: {
    flex: 1,
  },
  image_name_container: {
    height: 210,
    alignItems: 'center',
    paddingTop: SIZES.padding,
  },
  image_container: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: COLORS.darkgray,
  },
  name_container: {marginTop: SIZES.padding, justifyContent: 'center'},
  text_name: {color: COLORS.black, ...FONTS.h1},
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
  text_input: {flex: 1, paddingLeft: 10, color: COLORS.black, ...FONTS.body3},
});
export default MyProfile;
