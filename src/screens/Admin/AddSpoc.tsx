import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomTextInput from '../../components/CustomTextInput';
import Config from '../../Utils/config.json';
import Admin from '../../styles/screens/AdminStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
import { addSpoc, addSpocErrorFlag } from '../../redux/reducers/spocReducer';

const AddSpoc = ({ navigation, route }: any) => {
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState('');
  const [click, setClick] = useState(false);
  const [alert, setAlert] = useState(false);
  const AddSpocStyles = Admin().AddSpocStyles;
  const location = route.params;
  const initialRender = useRef(true);
  const dispatch = useDispatch();
  //@ts-ignore
  const res = useSelector(state => state.spoc.addSpocFlag);

  const updateEmail = (value: string) => {
    setEmail(value);
  };

  const updatestartDate = (value: Date) => {
    setStartDate(value);
  };

  const updateEndDate = (value: Date) => {
    setEndDate(value);
  };

  const renderEmailError = () => {
    if (error === 'Wrong Email') {
      return (
        <Text style={AddSpocStyles.error}>
          Please enter the correct email ID
        </Text>
      );
    } else if (error === 'No Email') {
      return <Text style={AddSpocStyles.error}>Required</Text>;
    }
  };

  const addNewSpoc = () => {
    if (email === '') {
      setError('No Email');
      dispatch(addSpocErrorFlag());
      setClick(false);
    } else {
      Alert.alert('Are you sure?', 'Confirm if you want to proceed further.', [
        {
          text: 'Disagree',
          style: 'cancel',
        },
        {
          text: 'Agree',
          onPress: () => {
            //add new spoc code
            //@ts-ignore
            dispatch(addSpoc({ email, startDate, endDate, location }));
            if (error === 'No Email') {
              setError('');
            }
            if (!res) {
              setTimeout(() => setError('Wrong Email'), 1000);
            }
          },
        },
      ]);
    }
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (res) {
        navigation.pop();
      }
    }
  }, [error, res, click, alert]);

  return (
    <View style={AddSpocStyles.container}>
      <StatusBar backgroundColor="#3274AB" />
      <View style={AddSpocStyles.email}>
        <CustomTextInput
          label="SPOC Email"
          updateValue={updateEmail}
          error={error === 'Wrong Email' || error === 'No Email'}
        />
        <>{renderEmailError()}</>
      </View>
      <View style={AddSpocStyles.date}>
        <Text style={AddSpocStyles.text}>Start Date</Text>
        <CustomDatePicker
          iconName="calendar-start"
          label="Select"
          updateValue={updatestartDate}
        />
      </View>
      <View style={AddSpocStyles.date}>
        <Text style={AddSpocStyles.text}>End Date</Text>
        <CustomDatePicker
          iconName="calendar-end"
          label="Select"
          updateValue={updateEndDate}
        />
      </View>
      <View style={AddSpocStyles.button_Position}>
        <CustomButton
          text="Add New SPOC"
          backgroundColor={Config.primaryButtonColor}
          textColor="white"
          onPress={() => {
            addNewSpoc();
          }}
        />
      </View>
    </View>
  );
};

export default AddSpoc;
