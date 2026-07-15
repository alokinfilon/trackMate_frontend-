
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MinusIcon = ({ size = 24, color = "#141B34", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Keeps your vector path perfectly centered when scaling
    fill="none"
    {...props}
  >
    <Path
      d="M20 12H4"
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MinusIcon;
