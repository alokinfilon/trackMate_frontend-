import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CommentIcon = ({ size = 24, color = "#000", strokeWidth = 1.5, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}          // Controlled dynamically by size prop
    height={size}         // Controlled dynamically by size prop
    viewBox="0 0 24 24"   // Ensures sharp lines and curves scale correctly together
    fill="none"
    {...props}
  >
    <Path
      stroke={color}             // Controlled dynamically by color prop
      strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2 10.5C2 5.5 6 3 12 3s10 2.5 10 7.5S18 18 12 18v3S2 18 2 10.5ZM8 8.5h8m-8 4h4"
    />
  </Svg>
);

export default CommentIcon;
