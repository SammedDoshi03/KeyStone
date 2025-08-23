import React from 'react';
import { render } from '@testing-library/react-native';
import CustomSearch from './custom-search';

jest.mock('react-native-vector-icons/Feather', () => 'Icon');

describe('CustomSearch', () => {
  it('renders correctly when searching by mail', () => {
    const { getByText } = render(
      <CustomSearch
        changeModalVisibility={() => {}}
        setData={() => {}}
        searchBy="mail"
        location="some-location"
      />,
    );
    expect(getByText('Search by Mail')).toBeTruthy();
  });

  it('renders correctly when searching by ID', () => {
    const { getByText } = render(
      <CustomSearch
        changeModalVisibility={() => {}}
        setData={() => {}}
        searchBy="id"
        location="some-location"
      />,
    );
    expect(getByText('Search by ID')).toBeTruthy();
  });
});
