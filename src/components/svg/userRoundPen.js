import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const UserRoundPen = ({ stroke = "#141B34", ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* User silhouette shoulder curve */}
    <Path
      d="M2 21a8 8 0 0 1 10.821-7.487"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Pen/Pencil dynamic shape path */}
    <Path
      d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* User head circle */}
    <Circle
      cx={10}
      cy={8}
      r={5}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default UserRoundPen;
