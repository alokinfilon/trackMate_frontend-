import * as React from "react";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({ size = 24, color = "#141B34", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Keeps crosshair vector lines perfectly pixel-aligned
    fill="none"
    {...props}
  >
    <Path
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.002 5v14.002M19.002 12.002H5"
    />
  </Svg>
);

export default PlusIcon;
