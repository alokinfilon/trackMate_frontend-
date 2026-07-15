import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SmileIcon = ({ size = 24, color = "#1B1B1C", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Ensures the smile and eyes scale correctly together
    fill="none"
    {...props}
  >
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.00897 9H8M16 9H15.991"
      stroke={color}             // Controlled dynamically by color prop
      // Forces the eyes to look balanced by scaling proportionally with the stroke request
      strokeWidth={strokeWidth === 1.5 ? 2 : strokeWidth + 0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SmileIcon;
