import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Config from '../Utils/config.json';

type AddCommentProps = {
  label: string;
  updateValue: (value: string) => void;
};

const AddCommentInput = ({ label, updateValue }: AddCommentProps) => {
  const [text, setText] = React.useState('');

  const onChangeText = (input: string) => {
    setText(input);
    updateValue(input);
  };
  const hasErrors = () => {
    if (text === null || text === '') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        mode="outlined"
        activeOutlineColor={Config.textInputBorderColor}
        onChangeText={onChangeText}
      />
      <HelperText type="error" visible={hasErrors()}>
        *This Field is Mandatory
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
export default AddCommentInput;
