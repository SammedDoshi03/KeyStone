import {Alert,Modal,StatusBar,Text,ToastAndroid,TouchableOpacity,View,} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';
import RemoveSpocModal from '../../components/RemoveSpocModal';
import {getSPOC, updateSPOC} from '../../firebase/manageSpoc';
import {
  ListDetailsComponent,
  DetailsSkeleton,
} from '../../components/SkeletonComonents';
import DatePicker from 'react-native-date-picker';
import Config from '../../Utils/config.json';
import AdminHomeStyleSheet from '../../styles/screens/AdminStyleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSpoc} from '../../redux/reducers/spocReducer';

const ViewSpoc = ({navigation, route}: any) => {
  const item = route.params?.item;
  const [change, setChange] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [details, setDetails] = useState<any[]>([]);
  const [date, setDate] = useState(item.endDate.toDate());
  const [open, setOpen] = useState(false);
  const [remove, setRemoved] = useState(false);
  const ViewSpocStyles = AdminHomeStyleSheet().ViewSpocStyles;
  //@ts-ignore
  const respone = useSelector(state => state.spoc.spocSingleData);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool);
  };

  const removedSPOC = (bool: boolean) => {
    setRemoved(bool);
  };

  const fetchSpoc1 = () => {
    //@ts-ignore
    dispatch(fetchSpoc({email: item.email}));
    if (respone !== undefined && respone !== null) {
      setDetails(respone);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchSpoc1();
    }, 1000);
  }, [change]);

  useEffect(() => {
    if (remove) {
      let location = item.location;
      navigation.navigate('AdminManageSpoc', {location});
    }
  }, [remove]);

  const AlretChange = (email, date) => {
    Alert.alert(
      'Are You Sure ?',
      `Update Date to : ${date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })} `,
      [
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Agree',
          onPress: () => {
            setChange(false);
            updateSPOC(email, date);
            setShowToast(true);
          },
        },
      ],
    );
  };

  useEffect(() => {
    setTimeout(() => {
      fetchSpoc();
    }, 1000);
  }, [change]);

  useEffect(() => {
    if (remove) {
      let location = item.location;
      navigation.navigate('AdminManageSpoc', {location});
    }
  }, [remove]);

  useEffect(() => {
    if (showToast) {
      ToastAndroid.showWithGravity(
        'Changes are saved successfully',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }, [showToast]);

  return details != null ? (
    <View style={ViewSpocStyles.container}>
      <StatusBar backgroundColor="#3274AB" />
      <View style={ViewSpocStyles.personalContent}>
        <Text style={ViewSpocStyles.descText}>Name</Text>
        <Text style={ViewSpocStyles.userText}>{item.name}</Text>
        <Text style={ViewSpocStyles.descText}>Mail ID</Text>
        <Text style={ViewSpocStyles.userText}>{item.email}</Text>
        <Text style={ViewSpocStyles.descText}>Location</Text>
        <Text style={ViewSpocStyles.userText}>{item.location}</Text>
      </View>
      <View style={ViewSpocStyles.assetContent}>
        <Text style={ViewSpocStyles.descText}>Start Date</Text>
        <Text style={ViewSpocStyles.userText}>
          {item.startDate
            .toDate()
            .toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
        </Text>
        <Text style={ViewSpocStyles.descText}>End Date</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={ViewSpocStyles.endDate}>
            {date != undefined
              ? date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : item.endDate
                  .toDate()
                  .toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
          </Text>
          <TouchableOpacity
            style={{marginLeft: 150}}
            onPress={() => {
              setChange(true);
              setOpen(true);
            }}>
            <Text style={{fontSize: 16, color: 'blue'}}>Change</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DatePicker
            modal
            open={open}
            date={date}
            mode={'date'}
            minimumDate={new Date()}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </View>
      <View style={ViewSpocStyles.button}>
        {change == true && (
          <CustomButton
            text="Save Changes"
            backgroundColor={Config.primaryUpdateButtonColor}
            textColor="#FFFFFF"
            onPress={() => {
              AlretChange(item.email, date);
            }}
          />
        )}
        {change == false && (
          <CustomButton
            text="Save Changes"
            backgroundColor={Config.primaryDisableduttonColor}
            textColor="#979797"
            onPress={() => console.warn('No Changes Made')}
          />
        )}
        <CustomButton
          text="Remove SPOC"
          backgroundColor={Config.primaryRejectionButtonColor}
          textColor="black"
          borderColor={Config.primaryRejectionOutlineButtonColor}
          onPress={() => changeModalVisibility(true)}
        />
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => changeModalVisibility(false)}>
          <RemoveSpocModal
            changeModalVisibility={changeModalVisibility}
            email={item.email}
            removedSPOC={removedSPOC}
          />
        </Modal>
      </View>
    </View>
  ) : (
    <View style={{flex: 1, justifyContent: 'flex-start', margin: 12}}>
      <ListDetailsComponent />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}>
        <DetailsSkeleton />
        <DetailsSkeleton />
      </View>
    </View>
  );
};

export default ViewSpoc;
