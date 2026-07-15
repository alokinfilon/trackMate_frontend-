import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ShareIcon = ({ size = 24, color = "#141B34", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Ensures the arrow and basin scale sharply together
    fill="none"
    {...props}
  >
    <Path
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7s2.196-2.716 3.404-3.761a.9.9 0 0 1 .63-.238.918.918 0 0 1 .562.238C13.804 4.284 16 7 16 7m-3.966-3v11M8 11c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 0 0-1.093 1.092C4 12.9 4 13.6 4 15v1c0 2.357 0 3.535.732 4.268C5.464 21 6.643 21 9 21h6c2.357 0 3.535 0 4.268-.732C20 19.535 20 18.357 20 16v-1c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.092C18.1 11 17.4 11 16 11"
    />
  </Svg>
);

export default ShareIcon;
