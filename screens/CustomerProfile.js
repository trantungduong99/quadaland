import React, {useState} from 'react';
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
const CustomerProfile = ({route, navigation}) => {
  const {
    full_name,
    phone,
    address,
    email,
    facebook,
    instagram,
    twitter,
  } = route.params.company;

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
              editable={false}
              multiline={true}
              value={full_name}
              style={styles.text_input}></TextInput>
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
              editable={false}
              multiline={true}
              value={phone}
              style={styles.text_input}></TextInput>
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
              editable={false}
              multiline={true}
              value={email}
              style={styles.text_input}></TextInput>
          </View>
        </View>

        <View
          style={{
            paddingTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          <View style={styles.action}>
            <Image source={icons.fb} style={styles.icon} resizeMode="contain" />
            <TextInput
              placeholder="Facebook"
              placeholderTextColor="#666666"
              autoCapitalize="none"
              editable={false}
              multiline={true}
              value={facebook}
              style={styles.text_input}></TextInput>

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
              editable={false}
              multiline={true}
              value={instagram}
              style={styles.text_input}></TextInput>
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
              editable={false}
              multiline={true}
              value={twitter}
              style={styles.text_input}></TextInput>
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
              editable={false}
              value={address}
              style={styles.text_input}></TextInput>
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
export default CustomerProfile;
