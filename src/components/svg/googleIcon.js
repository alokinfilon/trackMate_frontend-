import * as React from "react";
import Svg, { Path } from "react-native-svg";

const GoogleIcon = ({ size = 24, color = "#141B34", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}         // Controlled dynamically by size prop
    height={size}        // Controlled dynamically by size prop
    viewBox="0 0 24 24"  // Added viewBox to ensure smooth scaling
    fill="none"
    {...props}
  >
    <Path
      stroke={color}            // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
    />
    <Path
      stroke={color}            // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12h5a5 5 0 1 1-1.464-3.536"
    />
  </Svg>
);

export default GoogleIcon;
