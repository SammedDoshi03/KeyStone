import * as React from 'react';
import { Svg, Rect } from 'react-native-svg';

const EmployeeLogo = (props: any) => (
  <Svg width={100} height={100} {...props}>
    {/* Placeholder for EmployeeLogo.png */}
    <Rect width={100} height={100} fill="lightblue" />
  </Svg>
);

export default EmployeeLogo;
