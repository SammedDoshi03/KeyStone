import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, AccessibilityProps } from 'react-native';
import Config from '../../../Utils/config.json';
import { styles } from './custom-password-text-input.style';

interface CustomPasswordTextInputProps extends AccessibilityProps {
  label: string;
  error: boolean;
  updateValue: (value: string) => void;
}

const CustomPasswordTextInput = ({
  label,
  error,
  updateValue,
  ...props
}: CustomPasswordTextInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
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
        secureTextEntry={passwordVisible}
        mode="outlined"
        onChangeText={onChangeText}
        value={value}
        right={
          <TextInput.Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        {...props}
      />
    </View>
  );
};

export default CustomPasswordTextInput;
