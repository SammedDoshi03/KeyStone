import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import CustomButton from '../../components/atoms/custom-button';
import CustomModal from '../../components/CustomModal';
import CustomSpocList from '../../components/CustomSpocList';
import ListComponet, {
  TitleTextSkeleton,
} from '../../components/SkeletonComonents';
import Config from '../../Utils/config.json';
import AdminHomeStylesSheet from '../../styles/screens/AdminStyleSheet';
import {useFetchSpocs} from '../../hooks/useFetchSpocs';

const MemoizedCustomSpocList = React.memo(CustomSpocList);

const AdminManageSpoc = ({navigation, route}: any) => {
  const {
    response,
    isLoading,
    location,
    setLocation,
    setIsLoading,
  } = useFetchSpocs(route.params.location);
  const [isModalVisible, setisModalVisible] = useState(false);
  const AdminManageSpocStyles = AdminHomeStylesSheet().AdminManageSpocStyles;

  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool);
  };

  const setData = (option: string) => {
    setLocation(option);
    setIsLoading(true);
  };

  const handleNavigateToViewSpoc = useCallback(
    item => {
      navigation.navigate('ViewSpoc', {item});
    },
    [navigation],
  );

  const renderItem = ({item}) => (
    <MemoizedCustomSpocList
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
      onPress={() => handleNavigateToViewSpoc(item)}
    />
  );

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
        <FlatList
          data={response}
          renderItem={renderItem}
          keyExtractor={item => item.email}
        />
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
