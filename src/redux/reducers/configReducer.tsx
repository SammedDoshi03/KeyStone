import { createSlice } from '@reduxjs/toolkit';

export const config = createSlice({
  name: 'config',
  initialState: {
    mainBackgroundColor: '#FFFFFF',
    headerBackgroundColor: '#3274AB',
    headerTextColor: '#FFFFFF',

    primaryHeadingColor: 'black',

    generalTextColor: '#000000',
    fontSize: 18,
    primaryTextColor: '#3274AB',
    secondaryTextColor: '#979797',
    linktextColor: 'blue',

    descHeadColor: '#979797',

    lineBreakColor: '#979797',

    primaryButtonColor: '#1C0E3A',
    secondaryButtonColor: '',
    primaryButtonTextColor: 'white',

    primaryAffiramtionButtonColor: '#9BC354',
    secondaryAffiramtionButtonColor: '',

    primaryAffiramtionOutlineButtonColor: '#DD535D',
    secondaryAffiramtionOutlineButtonColor: '',

    primaryRejectionButtonColor: '#FFFFFF',
    secondaryRejectionButtonColor: '',

    primaryRejectionOutlineButtonColor: 'red',
    secondaryRejectionOutlineButtonColor: '',

    primaryUpdateButtonColor: '#9BC354',
    secondaryUpdateButtonColor: '',

    primaryUpdateOutlineButtonColor: '',
    secondaryUpdateOutlineButtonColor: '',

    primaryDisableduttonColor: '#EFEFEF',
    secondaryDisabledButtonColor: '',

    primaryDisabledOutlineButtonColor: '',
    secondaryDisabledOutlineButtonColor: '',

    textInputErrorBorderColor: 'red',
    textInputBorderColor: '#4DABD7',

    errorColor: 'red',
  },
  reducers: {
    Config: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { Config } = config.actions;

export default config.reducer;
