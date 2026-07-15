import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CheckMarkl = ({ size = 24, color = "#bbc5e7", strokeWidth = 1.5, ...props }) => (
  <Svg
    width={size}        // Maps dynamically to size prop
    height={size}       // Maps dynamically to size prop
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 14L8.5 17.5L19 6.5"
      stroke={color}            // Maps dynamically to color prop
      strokeWidth={strokeWidth}  // Maps dynamically to strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckMarkl;
