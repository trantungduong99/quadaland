import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {SIZES, COLORS, icons, FONTS, images} from '../constants';
import {
  Carousel,
  Menu,
  ProductIntro,
  RentIntro,
  ShoppingIntro,
} from '../components';
import {dummyImageData} from '../data/Data';

const Home = ({navigation}) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{marginHorizontal: SIZES.padding}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setRefresh(false);
            }}
          />
        }>
        <View style={{height: 0.05 * SIZES.height}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{width: '85%'}}
                  onPress={() => {
                    navigation.navigate('Search', {searchOption: 'for_sale'});
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#C8CACE',
                      borderRadius: 50,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={icons.search}
                      resizeMode="contain"
                      style={{
                        height: 0.03 * SIZES.height,
                        width: 0.03 * SIZES.height,
                        marginTop: 0.01 * SIZES.height,
                        marginBottom: 0.01 * SIZES.height,
                        marginLeft: 15,
                        marginRight: 15,
                      }}
                    />
                    <Text style={{color: COLORS.black, ...FONTS.body4}}>
                      Tìm kiếm...
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: 0.05 * SIZES.height}}
                  onPress={() => {
                    navigation.navigate('Map');
                  }}>
                  <View
                    style={{
                      backgroundColor: '#0099CC',
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={icons.map}
                      resizeMode="contain"
                      style={{
                        height: 0.03 * SIZES.height,
                        width: 0.03 * SIZES.height,
                        margin: 0.01 * SIZES.height,
                        tintColor: COLORS.white,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{height: 0.23 * SIZES.height}}>
          <View style={{flex: 1, marginVertical: SIZES.base}}>
            <Carousel data={dummyImageData} />
          </View>
        </View>
        <View style={{height: 0.26 * SIZES.height}}>
          <Menu />
        </View>
        <View style={{height: 0.45 * SIZES.height}}>
          <ShoppingIntro />
        </View>
        <View style={{height: 0.45 * SIZES.height}}>
          <RentIntro />
        </View>
        <View style={{height: 0.4 * SIZES.height}}>
          <ProductIntro />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: SIZES.padding},
});
