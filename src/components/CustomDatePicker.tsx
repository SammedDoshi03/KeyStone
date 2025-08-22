import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-paper';
import { StyleSheet, View, Button } from 'react-native';
import Config from '../Utils/config.json'

type CDatepickerProps = {
  iconName:string;
  label:string;
  updateValue : (date:Date) => void;
}
const CustomDatepicker = ({iconName,label, updateValue}:CDatepickerProps) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [inLabel,setInLabel]=useState(label)

  const onConfirm = (input:any) =>{
    setDate(input);
    updateValue(input);
  }
  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder={inLabel}
          placeholderTextColor="black"
          mode='outlined'
          disabled
          right={<TextInput.Icon name={iconName} color={Config.primaryButtonColor} onPress={() =>setOpen(true)} />}
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={new Date()}
        mode={'date'}
        onConfirm={(date) => {
          setOpen(false)
          onConfirm(date)
          setInLabel(date.toDateString());
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CustomDatepicker;