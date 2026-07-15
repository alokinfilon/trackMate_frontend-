import * as React from "react";
import Svg, { Path } from "react-native-svg";

const BellIcon = ({ size = 24, color = "#141B34", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}         // Controlled dynamically by size prop
    height={size}        // Controlled dynamically by size prop
    viewBox="0 0 24 24"  // Keeps vector lines crisp when scaling up/down
    fill="none"
    {...props}
  >
    <Path
      d="M19 18V9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5V18"
      stroke={color}            // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 18H3.5"
      stroke={color}            // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5 20C13.5 20.8284 12.8284 21.5 12 21.5M12 21.5C11.1716 21.5 10.5 20.8284 10.5 20M12 21.5V20"
      stroke={color}            // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinejoin="round"
    />
  </Svg>
);

export default BellIcon;
