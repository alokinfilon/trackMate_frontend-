import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AppleIcon = ({ size = 24, color = "#000", strokeWidth = 1.5, ...props }) => (
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
      strokeLinejoin="round"
      d="M12 5.75c0-2 1.5-4 3.5-4 0 2-1.5 4-3.5 4ZM12.5 8.09c-.515 0-.913-.164-1.359-.346-.563-.232-1.202-.494-2.248-.494C7.023 7.25 4 8.75 4 12.75c0 4.652 3.105 9.5 5.105 9.5.67 0 1.272-.263 1.849-.514.527-.23 1.033-.45 1.546-.45.513 0 1.018.22 1.546.45.577.251 1.18.514 1.85.514 1.392 0 3.061-2.35 4.104-5.35-1.62-.68-2.662-2.282-2.662-4.15 0-1.629.866-2.71 2.162-3.5-1-1.5-2.487-2-3.555-2-1.046 0-1.685.262-2.248.494-.446.182-.682.346-1.197.346Z"
    />
  </Svg>
);

export default AppleIcon;
