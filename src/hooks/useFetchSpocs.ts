import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { fetchSpocByLocationAsync } from '../redux/reducers/spocReducer';

// Define a RootState type for better typing
type RootState = {
  spoc: {
    manageSpocData: any[]; // Adjust the type of manageSpocData as needed
    isLoading: boolean;
  };
  // ... other reducers
};

export const useFetchSpocs = (initialLocation: string) => {
  const [location, setLocation] = useState(initialLocation);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { manageSpocData: response, isLoading } = useSelector(
    (state: RootState) => state.spoc,
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchSpocByLocationAsync(location));
  }, [location, isFocused, dispatch]);

  return { response, isLoading, location, setLocation };
};
