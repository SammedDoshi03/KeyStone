import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from './custom-text-input';

describe('CustomTextInput', () => {
  it('renders correctly', () => {
    const { getByLabelText } = render(
      <CustomTextInput label="Test Input" error={false} updateValue={() => {}} />,
    );
    expect(getByLabelText('Test Input')).toBeTruthy();
  });

  it('calls updateValue on text change', () => {
    const updateValueMock = jest.fn();
    const { getByLabelText } = render(
      <CustomTextInput
        label="Test Input"
        error={false}
        updateValue={updateValueMock}
      />,
    );
    fireEvent.changeText(getByLabelText('Test Input'), 'new text');
    expect(updateValueMock).toHaveBeenCalledWith('new text');
  });
});
