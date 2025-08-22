import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View,Text,Modal,TouchableOpacity,StatusBar,Image,} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import CustomSpocList from '../../components/CustomSpocList';
import ListComponet, {TitleTextSkeleton,} from '../../components/SkeletonComonents';
import Config from '../../Utils/config.json';
import AdminHomeStylesSheet from '../../styles/screens/AdminStyleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpocByLocation} from '../../redux/reducers/spocReducer';

const AdminManageSpoc = ({navigation, route}: any) => {
  const [location, setlocation] = useState(route.params.location);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const AdminManageSpocStyles = AdminHomeStylesSheet().AdminManageSpocStyles;
  //@ts-ignore
  const response = useSelector(state => state.spoc.manageSpocData);
  const dispatch = useDispatch();

  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool);
  };

  const setData = (option: string) => {
    setlocation(option);
    setIsLoading(true);
  };

  const fetchMyAPI = () => {
    //@ts-ignore
    dispatch(fetchSpocByLocation({location}));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMyAPI();
  }, [location, isFocused, isLoading]);

  return !isLoading ? (
    response === null ? (
      <View style={AdminManageSpocStyles.container}>
        <StatusBar backgroundColor="#3274AB" hidden={false} />
        <View style={{flexDirection: 'row'}}>
          <Text style={AdminManageSpocStyles.text}>Selected Location:</Text>
          <TouchableOpacity
            onPress={() => {
              changeModalVisibility(true);
            }}>
            <Text style={AdminManageSpocStyles.text_location}>{location}</Text>
          </TouchableOpacity>
        </View>
        <Text style={AdminManageSpocStyles.text}>Number of SPOC : {0}</Text>
        <View style={AdminManageSpocStyles.line}></View>
        <Image
          style={AdminManageSpocStyles.image}
          source={require('../../assets/EmptyManageSpoc.png')}
        />
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => changeModalVisibility(false)}>
          <CustomModal
            changeModalVisibility={changeModalVisibility}
            setData={setData}
          />
        </Modal>
        <View style={AdminManageSpocStyles.btn}>
          <CustomButton
            text="Add New SPOC"
            backgroundColor={Config.primaryButtonColor}
            textColor="white"
            onPress={() =>
              navigation.navigate('AddSpoc', location)
            }></CustomButton>
        </View>
      </View>
    ) : (
      <View style={AdminManageSpocStyles.container}>
        <StatusBar backgroundColor="#3274AB" hidden={false} />
        <View style={{flexDirection: 'row'}}>
          <Text style={AdminManageSpocStyles.text}>Selected Location:</Text>
          <TouchableOpacity
            onPress={() => {
              changeModalVisibility(true);
            }}>
            <Text style={AdminManageSpocStyles.text_location}>{location}</Text>
          </TouchableOpacity>
        </View>
        <Text style={AdminManageSpocStyles.text}>
          Number of SPOC : {response.length}
        </Text>
        <View style={AdminManageSpocStyles.line}></View>
        {response.map(item => {
          return (
            <CustomSpocList
              key={item.email}
              email={item.email}
              name={item.name}
              startDate={item.startDate.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              endDate={item.endDate.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              onPress={() =>
                navigation.navigate('ViewSpoc', {item})
              }></CustomSpocList>
          );
        })}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => changeModalVisibility(false)}>
          <CustomModal
            changeModalVisibility={changeModalVisibility}
            setData={setData}
          />
        </Modal>
        <View style={AdminManageSpocStyles.btn}>
          <CustomButton
            text="Add New SPOC"
            backgroundColor={Config.primaryButtonColor}
            textColor="white"
            onPress={() => {
              navigation.navigate('AddSpoc', location);
            }}></CustomButton>
        </View>
      </View>
    )
  ) : (
    <View style={{flex: 1, justifyContent: 'center', margin: 12}}>
      <View
        style={{flex: 0.2, flexDirection: 'column', justifyContent: 'center'}}>
        <TitleTextSkeleton />
        <TitleTextSkeleton />
      </View>
      <View
        style={{
          flex: 0.75,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <ListComponet />
        <ListComponet />
        <ListComponet />
        <ListComponet />
        <ListComponet />
      </View>
    </View>
  );
};

export default AdminManageSpoc;
