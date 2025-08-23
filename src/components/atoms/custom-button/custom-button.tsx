import { Text, TouchableOpacity, AccessibilityProps } from 'react-native';
import React from 'react';
import { getStyles } from './custom-button.style';
import { useTheme } from '../../../hooks/useTheme';

interface CustomButtonProps extends AccessibilityProps {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

const CustomButton = ({
  text,
  disabled,
  onPress,
  backgroundColor,
  borderColor,
  textColor,
  ...props
}: CustomButtonProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.colors.primary,
          borderColor: borderColor ? borderColor : theme.colors.primary,
        },
      ]}
      {...props}>
      <Text
        style={[
          styles.text,
          {
            color: textColor ? textColor : theme.colors.buttonText,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
