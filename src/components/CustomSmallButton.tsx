import { StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'


type CustomButtonProps = {
    text: string;
    disabled?: boolean;
    onPress?: () => void;
    backgroundColor?:string;
    borderColor?:string;
    textColor?:string
};

const CustomSmallButton = ({text,disabled,onPress,backgroundColor,borderColor,textColor}:CustomButtonProps) =>{

  return (
    <Pressable onPress={onPress} disabled={disabled} style={[
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
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'40%',
        padding:10,
        alignItems:'center',
        marginVertical:10,
        borderRadius:40,
        marginLeft:'7%',
        borderWidth:0.5
    },
    text:{
        fontWeight:'bold',
        color:'black',
        fontSize:15
    }
})

export default CustomSmallButton;