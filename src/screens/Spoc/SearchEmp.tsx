import { Text, View, StatusBar, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSearch from '../../components/molecules/custom-search'
import CustomButton from '../../components/atoms/custom-button'
import { Searchbar } from 'react-native-paper'
import { SearchEmpStyles } from '../../styles/screens/SpocStyleSheet'

const SearchEmp = ({ navigation, route }: any) => {

  const [isModalVisible, setisModalVisible] = useState(false);
  const [empData, setEmpData] = useState('')
  const [data1, setData1] = useState('')

  const changeModalVisibility = (bool: boolean) => {
    setisModalVisible(bool)
  }

  const setData = (option: string) => {
    setEmpData(option)
  }

  return (
    <View style={SearchEmpStyles.container}>
      <StatusBar backgroundColor='#3274AB' />
      <Text style={SearchEmpStyles.textContainer}>Search Empolyee in system by mail or Employee ID</Text>
      <View style={SearchEmpStyles.searchContainer}>
        <Searchbar
          placeholder={'Search by Employee Mail'}
          onPressIn={() => { setData1("mail"); setisModalVisible(true) }}
          //@ts-ignore
          style={{ borderRadius: 10, marginTop: 30, width: '90%', marginLeft: 20 }} value={empData.email} />
      </View>
      <View>
        <Text style={SearchEmpStyles.secondText}>--OR--</Text>
      </View>
      <View style={SearchEmpStyles.searchContainer}>
        <Searchbar
          placeholder={'Search by Employee ID'}
          onPressIn={() => { setData1("id"); setisModalVisible(true) }}
          //@ts-ignore
          style={{ borderRadius: 10, marginTop: 30, width: '90%', marginLeft: 20 }} value={empData.empId} />
        <Modal
          transparent={true}
          animationType='fade'
          visible={isModalVisible}
          onRequestClose={() => { changeModalVisibility(false) }}
          style={SearchEmpStyles.modalStyle}>
          <CustomSearch changeModalVisibility={changeModalVisibility}
            setData={setData}
            searchBy={data1}
            location={route.params.location} />
        </Modal>
      </View>
      <View style={SearchEmpStyles.btn}>
        <CustomButton text='Continue' textColor='#FFFFFF' backgroundColor='#1C0E3A' onPress={() => {
          if (empData != '') {
            navigation.navigate('SelectCategory', { empData })
          }
          else {
            Alert.alert('Please select the correct employee')
          }
        }} />
      </View>
    </View>
  )
}

export default SearchEmp;
