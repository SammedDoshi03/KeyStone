import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, AccessibilityProps } from 'react-native';
import Config from '../../../Utils/config.json';
import { styles } from './custom-text-input.style';

interface CustomTextInputProps extends AccessibilityProps {
  label: string;
  error: boolean;
  updateValue: (value: string) => void;
}

const CustomTextInput = ({
  label,
  error,
  updateValue,
  ...props
}: CustomTextInputProps) => {
  const [value, setValue] = useState('');

  const onChangeText = (input: string) => {
    setValue(input);
    updateValue(input);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        activeOutlineColor={
          error ? Config.textInputErrorBorderColor : Config.textInputBorderColor
        }
        outlineColor={error ? Config.textInputErrorBorderColor : '#979797'}
        mode="outlined"
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
