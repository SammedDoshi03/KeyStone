import React, { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper'
import { StyleSheet,View } from 'react-native'
import Config from '../Utils/config.json'

type CustomTextInputProps={
    label : string;
    error : boolean;
    updateValue : (value:string) => void;
}

const CustomTextInput = ({label, error, updateValue}:CustomTextInputProps) =>{

    const [value,setValue]=useState('');
    
    const onChangeText = (input:string) =>{
        setValue(input);
        updateValue(input);
    }

    return(
        <View style={styles.container}>
            <TextInput
            label={label}
            activeOutlineColor={(error) ? Config.textInputErrorBorderColor : Config.textInputBorderColor}
            outlineColor={(error) ? Config.textInputErrorBorderColor: '#979797'}
            mode="outlined"
            onChangeText={onChangeText}
            value={value}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingLeft:20,
        paddingRight:20
    }
})
export default CustomTextInput;