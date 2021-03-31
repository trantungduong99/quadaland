import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ColorPropType,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dummyProjectData} from '../data/Data';
import {SIZES, icons, COLORS, FONTS, images} from '../constants';

const ProjectDetail = ({route}) => {
  const navigation = useNavigation();
  const project = route.params.item;
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{height: 0.3 * SIZES.height, backgroundColor: 'red'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
              horizontal
              removeClippedSubviews
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              scrollEnabled
              scrollEventThrottle={16}
              decelerationRate={'fast'}
              snapToAlignment="center"
              data={dummyProjectData}
              keyExtractor={(item) => 'DetailImages' + item.id}
              renderItem={({item}) => {
                return (
                  <Image
                    source={item.img}
                    resizeMode="cover"
                    style={{height: '100%', width: SIZES.width}}
                  />
                );
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: SIZES.width,
              padding: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{width: 0.03 * SIZES.height}}
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: 0.03 * SIZES.height}}
              onPress={() => {
                console.log('MoreAction in ProjectDetail on Pressed');
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={icons.more}
                  resizeMode="contain"
                  style={{
                    height: 0.03 * SIZES.height,
                    width: 0.03 * SIZES.height,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, padding: SIZES.padding}}>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.primary, ...FONTS.h3}}>Dự án</Text>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  marginLeft: SIZES.padding,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 4,
                  borderRadius: 4,
                }}>
                <Text style={{color: COLORS.white, ...FONTS.body4}}>
                  {project.status == 1 ? 'Đang mở bán' : 'Sắp mở bán'}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: COLORS.lightGray,
                  borderRadius: 20,
                }}>
                <Image
                  style={{height: 40, width: 40, borderRadius: 20}}
                  source={images.avatar}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1, marginTop: SIZES.padding}}>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>
              {project.projectName}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body4,
                marginTop: SIZES.base,
              }}>
              {project.projectAddress}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: SIZES.base,
            }}>
            <Text style={{color: COLORS.primary, ...FONTS.body4}}>2,3 tỷ</Text>
            <Text style={{color: COLORS.primary, ...FONTS.body4}}>
              70 triệu/m2
            </Text>
          </View>
        </View>
        <View style={{flex: 1, padding: SIZES.padding}}>
          <Text style={{color: COLORS.black, ...FONTS.h3}}>
            Thông tin dự án
          </Text>
          <Text style={{color: COLORS.black, ...FONTS.body3}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ligula
            ullamcorper malesuada proin libero nunc consequat interdum varius
            sit. Dignissim sodales ut eu sem. Porta nibh venenatis cras sed
            felis eget velit aliquet sagittis. Faucibus vitae aliquet nec
            ullamcorper sit amet risus. Dolor sit amet consectetur adipiscing.
            Eget velit aliquet sagittis id consectetur purus. Pretium vulputate
            sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sed
            adipiscing diam donec adipiscing tristique risus. Consequat mauris
            nunc congue nisi vitae suscipit tellus mauris. Vitae purus faucibus
            ornare suspendisse sed nisi lacus sed. Sit amet purus gravida quis
            blandit turpis cursus in hac. Porttitor eget dolor morbi non arcu.
            Vitae elementum curabitur vitae nunc sed velit dignissim sodales.
            Est lorem ipsum dolor sit amet. Maecenas pharetra convallis posuere
            morbi. Augue eget arcu dictum varius duis at. Dolor sit amet
            consectetur adipiscing elit. Mi in nulla posuere sollicitudin.
            Pretium vulputate sapien nec sagittis. Ut pharetra sit amet aliquam
            id diam. Sed cras ornare arcu dui vivamus. Malesuada pellentesque
            elit eget gravida cum. Placerat orci nulla pellentesque dignissim
            enim sit amet. Ullamcorper eget nulla facilisi etiam dignissim diam
            quis enim lobortis. Suscipit adipiscing bibendum est ultricies
            integer quis auctor elit. Rhoncus aenean vel elit scelerisque mauris
            pellentesque pulvinar pellentesque. Commodo quis imperdiet massa
            tincidunt nunc pulvinar sapien et ligula. Gravida arcu ac tortor
            dignissim convallis aenean. Vestibulum mattis ullamcorper velit sed
            ullamcorper morbi tincidunt ornare. Vel pharetra vel turpis nunc
            eget. Faucibus a pellentesque sit amet porttitor eget dolor morbi.
            Ac placerat vestibulum lectus mauris ultrices. Eget mi proin sed
            libero enim sed faucibus turpis in.
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          height: 140,
          backgroundColor: '#FAFAFA',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            flexDirection: 'column',
            padding: SIZES.padding,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: COLORS.lightGray,
                }}>
                <Image
                  source={images.avatar}
                  style={{height: 60, width: 60, borderRadius: 30}}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  width: SIZES.width - 180,
                  paddingHorizontal: SIZES.padding,
                }}>
                <Text style={{color: COLORS.black, ...FONTS.h4}}>
                  Trần Tấn Chung
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: COLORS.primary,
                height: 30,
                width: 90,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.body4}}>
                Theo dõi
              </Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                marginTop: SIZES.padding,
                marginRight: SIZES.padding,
                borderRadius: 5,
                borderColor: COLORS.primary,
                borderWidth: 1,
                justifyContent:'center',
                alignItems:"center",flexDirection:"row"
              }}>
                <Image source={icons.message} style={{width:25,height:25,tintColor:COLORS.white}} resizeMode="contain"/>
                <Text style={{color:COLORS.white,...FONTS.body4,marginLeft:SIZES.padding}}>Chat ngay</Text>
              </View>
            <View
              style={{
                flex: 1,
                marginTop: SIZES.padding,
                marginLeft: SIZES.padding,
                borderRadius: 5,
                borderColor: COLORS.primary,
                borderWidth: 1,
                justifyContent:"center",
                alignItems:"center",flexDirection:"row"
              }}>
                <Image source={icons.call} style={{width:25,height:25,tintColor:COLORS.primary}} resizeMode="contain"/>
                <Text style={{color:COLORS.primary,...FONTS.body4,marginLeft:SIZES.padding}}>0915 207 ***</Text>
              </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProjectDetail;
