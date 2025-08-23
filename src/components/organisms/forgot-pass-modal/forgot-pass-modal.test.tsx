import React from 'react';
import { render } from '@testing-library/react-native';
import ForgotPassModal from './forgot-pass-modal';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('ForgotPassModal', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ForgotPassModal changeModalVisibility={() => {}} />,
    );
    expect(getByText('Forgot Password')).toBeTruthy();
  });
});
