import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomCategoryModal from '../../components/CustomCategoryModal';
import CustomButton from '../../components/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { SelectCategoryStyles } from '../../styles/screens/SpocStyleSheet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchSubCategory, purgeCategoryData } from '../../redux/reducers/categoryReducer';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SelectCategory = ({ navigation, route }: any) => {
  const [projectName, setProjectName] = useState('');
  const [categoryData, setCategoryData]: any[] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryPath, setCategoryPath] = useState('category');
  const [listKey, setListKey] = useState(0);
  const [assetData, setAssetData]: any[] = useState([]);
  const [serialNumber, setSerialNumber]: any = useState(0);
  const [show, setShow] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = useState('');
  const isFocused = useIsFocused();
  //@ts-ignore
  const Config = useSelector(state => state.config);
  //@ts-ignore
  const catData = useSelector(state => state.category.CategoryData);
  //@ts-ignore
  const subCategoryData = useSelector(state => state.category.subCategoryData);
  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const oldValue = useRef('');
  console.log('cat', catData)

  const updateProjectName = (value: string) => {
    setProjectName(value);
  };

  const updateSerialNumber = (value: string) => {
    setSerialNumber(value);
  };

  const updateCategoryPath = (value: string) => {
    setCategoryPath(value);
  };

  const updateListKey = (value: any) => {
    setListKey(value);
  };

  const getCategoryData = () => {
    if (firstRender.current) {
      console.log('FLAG')
      dispatch(fetchCategory());
      firstRender.current = false;
    }
    const res = catData;
    let list: any[] = [];
    list.push(res);
    setCategoryData(list);
    setIsLoading(false);
  }

  const renderItem = category => {
    const cat = categoryData;
    console.log('list cat data = ', categoryData)
    let item = cat;
    const a = item[category.index];
    return (
      <View style={SelectCategoryStyles.categoryContent}>
        <CustomCategoryModal
          title="Select Category"
          items={categoryData}
          categoryPath={categoryPath}
          listKey={category.index}
          updateListKey={updateListKey}
          updateCategoryPath={updateCategoryPath}
        />
      </View>
    );
  };

  const getSubCategory = (value: string) => {
    
    if (catData.length>0) {
    console.log('path value = ', value)
    if(oldValue.current!=value){
      //@ts-ignore
    dispatch(fetchSubCategory({ path: value }));
    }
    const res = subCategoryData;
    console.log('front res = ', res);
    if (res.length > 0) {
      //@ts-ignore
      setCategoryPath(res[0]);
      //@ts-ignore
      const str = res[0].split('/');
      if (categoryData.length != listKey + 1) {
        categoryData.length = listKey + 1
      }

      if (categoryPath != 'category' && res[1] != null) {
        let list = categoryData;
        list.push(res[1]);
        setCategoryData(list);
      }

      if (res[1] === null) {
        setShow(true);
        setAssetData([projectName, serialNumber, categoryPath]);
      }
    }
    }
    oldValue.current = value;
  }

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const continueBtn = () => {
    if (show && projectName != '' && serialNumber != '') {
      const empData = route.params.empData;
      navigation.navigate('AssignAssetConfirmation', { assetData, empData });
    } else {
      Alert.alert('Please select all required options to proceed.');
    }
  };

  useEffect(() => {
    console.log('purge step')
    dispatch(purgeCategoryData());
    firstRender.current = true;
  }, [isFocused]);

  useEffect(() => {
    getCategoryData();
  }, [isLoading, isFocused, catData]);

  useEffect(() => {
    console.log('use cat = ', categoryPath)
    getSubCategory(categoryPath);
  }, [categoryPath, subCategoryData]);

  return (
    <ScrollView
      persistentScrollbar={true}
      indicatorStyle="black"
      showsVerticalScrollIndicator={true}
      style={SelectCategoryStyles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <StatusBar backgroundColor="#3274AB" />
      <View style={SelectCategoryStyles.personalContent}>
        <Text style={SelectCategoryStyles.descText}>Name</Text>
        <Text style={SelectCategoryStyles.userText}>
          {route.params.empData.name}
        </Text>
        <Text style={SelectCategoryStyles.descText}>Mail ID</Text>
        <Text style={SelectCategoryStyles.userText}>
          {route.params.empData.email}
        </Text>
      </View>
      <View style={SelectCategoryStyles.line}></View>
      <View style={SelectCategoryStyles.assetContent}>
        <CustomTextInput
          label="Enter Project Name"
          updateValue={updateProjectName}
          error={error != ''}
        />
      </View>
      <View style={SelectCategoryStyles.assetContent}>
        <CustomTextInput
          label="Enter Serial Number"
          updateValue={updateSerialNumber}
          error={error != ''}
        />
      </View>
      <View style={SelectCategoryStyles.line}></View>
      <FlatList
        data={categoryData}
        renderItem={renderItem}
        extraData={categoryData}
      />
      <View style={SelectCategoryStyles.btn}>
        <CustomButton
          text="Continue"
          backgroundColor={Config.primaryButtonColor}
          textColor="#FFFFFF"
          onPress={() => {
            continueBtn();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SelectCategory;