import { StyleSheet, Text, Pressable, TouchableOpacity} from 'react-native'
import React from 'react'


type CustomButtonProps = {
    text: string;
    disabled?: boolean;
    onPress?: () => void;
    backgroundColor?:string;
    borderColor?:string;
    textColor?:string
};

const CustomButton = ({text,disabled,onPress,backgroundColor,borderColor,textColor}:CustomButtonProps) =>{

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8} style={[
        styles.container,
        {
            backgroundColor: backgroundColor?backgroundColor:"#E6E8E7",
            borderColor: borderColor?borderColor:"#C4C4C4",
        },
    ]}>
        <Text style={[
            styles.text,
            {
                color: textColor?textColor:"black"
            }
        ]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'75%',
        padding:17,
        alignItems:'center',
        marginVertical:10,
        borderRadius:40,
        marginLeft:'13%',
        borderWidth:1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    text:{
        fontWeight:'bold',
        color:'black',
        fontSize:16,
    }
})

export default CustomButton;