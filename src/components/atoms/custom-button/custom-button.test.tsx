import React from 'react';
import { render } from '@testing-library/react-native';
import CustomButton from './custom-button';

describe('CustomButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CustomButton text="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });
});
