import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowLeftIcon = ({ size = 24, color = "black", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Keeps your chevron path perfectly centered when scaling
    fill="none"
    {...props}
  >
    <Path
      d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeftIcon;
