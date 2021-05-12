import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
} from 'react-native';
import {COLORS, SIZES, icons, FONTS} from '../constants';
import {changePassword} from '../services/authService';

const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isValidOldPassword, setIsValidOldPassword] = useState(false);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isValidConfirmNewPassword, setIsValidConfirmNewPassword] = useState(
    false,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(true);

  const text_oldPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setOldPassword(val);
      setIsValidOldPassword(true);
    } else {
      setOldPassword(val);
      setIsValidOldPassword(false);
    }
  };
  const handleValidOldPassword = (val) => {
    if (val.trim().length >= 8) {
      setIsValidOldPassword(true);
    } else {
      setIsValidOldPassword(false);
    }
  };
  const text_newPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setNewPassword(val);
      setIsValidNewPassword(true);
    } else {
      setNewPassword(val);
      setIsValidNewPassword(false);
    }
  };
  const handleValidNewPassword = (val) => {
    if (val.trim().length >= 8) {
      setIsValidNewPassword(true);
    } else {
      setIsValidNewPassword(false);
    }
  };
  const text_confirmNewPasswordChange = (val) => {
    if (val == newPassword) {
      setConfirmNewPassword(val);
      setIsValidConfirmNewPassword(true);
    } else {
      setConfirmNewPassword(val);
      setIsValidConfirmNewPassword(false);
    }
  };
  const handleValidConfirmNewPassword = (val) => {
    if (val == newPassword) {
      setIsValidConfirmNewPassword(true);
    } else {
      setIsValidConfirmNewPassword(false);
    }
  };
  const handleChangePassword = async (values) => {
    const {oldPassword, newPassword, confirmNewPassword} = values;

    if (
      oldPassword &&
      newPassword &&
      confirmNewPassword &&
      isValidConfirmNewPassword &&
      isValidNewPassword &&
      isValidOldPassword
    ) {
      changePassword(oldPassword, newPassword, confirmNewPassword)
        .then((response) => {
          if (response.data.updated_at) {
            setChangeSuccess(true);
            setModalVisible(true);
          } else {
            setChangeSuccess(false);
            setModalVisible(true);
          }
        })
        .catch((error) => {
          setChangeSuccess(false);
          setModalVisible(true);
          console.log(error);
        });
    } else {
      return;
    }
  };
  const handleGoBack = () => {
    setModalVisible(false);
    navigation.goBack();
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
        <Text style={styles.text_title}>Đổi mật khẩu</Text>
      </View>
      <View style={{padding: SIZES.padding}}>
        <View style={styles.action}>
          <Image
            source={icons.password}
            style={styles.icon}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Mật khẩu hiện tại"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            onChangeText={(val) => {
              text_oldPasswordChange(val);
            }}
            onEndEditing={(e) => {
              handleValidOldPassword(e.nativeEvent.text);
            }}
            secureTextEntry={true}
            style={styles.text_input}></TextInput>
          {isValidOldPassword ? (
            <Image
              source={icons.checkmark}
              style={{height: 20, width: 20, tintColor: 'green'}}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
      <View style={{paddingHorizontal: SIZES.padding}}>
        <View style={styles.action}>
          <Image source={icons.key} style={styles.icon} resizeMode="contain" />
          <TextInput
            placeholder="Mật khẩu mới"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(val) => {
              text_newPasswordChange(val);
            }}
            onEndEditing={(e) => {
              handleValidNewPassword(e.nativeEvent.text);
            }}
            style={styles.text_input}></TextInput>
          {isValidNewPassword ? (
            <Image
              source={icons.checkmark}
              style={{height: 20, width: 20, tintColor: 'green'}}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
      <View style={{padding: SIZES.padding}}>
        <View style={styles.action}>
          <Image source={icons.key} style={styles.icon} resizeMode="contain" />
          <TextInput
            placeholder="Nhập lại mật khẩu mới"
            placeholderTextColor="#666666"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(val) => {
              text_confirmNewPasswordChange(val);
            }}
            onEndEditing={(e) => {
              handleValidConfirmNewPassword(e.nativeEvent.text);
            }}
            style={styles.text_input}></TextInput>
          {isValidConfirmNewPassword ? (
            <Image
              source={icons.checkmark}
              style={{height: 20, width: 20, tintColor: 'green'}}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
      <View style={{paddingHorizontal: SIZES.padding}}>
        <TouchableOpacity
          style={styles.button_confirm}
          onPress={() => {
            handleChangePassword({
              oldPassword: oldPassword,
              newPassword: newPassword,
              confirmNewPassword: confirmNewPassword,
            });
          }}>
          <Text style={styles.text_button}>Cập nhật mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: SIZES.padding}}>
        <TouchableOpacity
          style={styles.button_cancel}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.text_button_cancel}>Hủy</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', marginTop: SIZES.padding}}>
        <TouchableOpacity>
          <Text style={{color: '#00AEDD'}}>Quên mật khẩu?</Text>
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
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
            {changeSuccess ? (
              <>
                <Text style={{color: 'green', ...FONTS.h3}}>Thành công!</Text>
                <TouchableOpacity
                  onPress={() => {
                    handleGoBack();
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
                    handleGoBack();
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
  text_title: {color: COLORS.black, ...FONTS.body2, marginLeft: 2*SIZES.padding},
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
  text_input: {flex: 1, paddingLeft: 10},
  button_confirm: {
    height: 38,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#00AEDD',
    paddingHorizontal: SIZES.padding,
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
  },
  text_button: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  button_cancel: {
    height: 37,
    borderRadius: 5,
    backgroundColor: '#CCCCCC',
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
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
  },
  text_button_cancel: {
    color: COLORS.black,
    ...FONTS.h4,
  },
});

export default ChangePassword;
