import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HeartIcon = ({ size = 24, color = "#141B34", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Keeps the heart curve paths sharp and uniform
    fill="none"
    {...props}
  >
    <Path
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.41 19.968C7.59 17.858 2 13.035 2 8.694 2 5.826 4.105 3.5 7 3.5c1.5 0 3 .5 5 2.5 2-2 3.5-2.5 5-2.5 2.895 0 5 2.326 5 5.194 0 4.34-5.59 9.164-8.41 11.274-.95.71-2.23.71-3.18 0Z"
    />
  </Svg>
);

export default HeartIcon;
