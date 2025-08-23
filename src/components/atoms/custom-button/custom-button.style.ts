import { StyleSheet } from 'react-native';

export const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '75%',
      padding: theme.spacing.l,
      alignItems: 'center',
      marginVertical: theme.spacing.m,
      borderRadius: 40,
      marginLeft: '13%',
      borderWidth: 1,
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 8,
    },
    text: {
      fontWeight: 'bold',
      color: theme.colors.buttonText,
      fontSize: theme.typography.body.fontSize,
    },
  });
