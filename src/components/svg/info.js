import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const Info = ({ stroke = "#141B34", ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Outer circle boundary */}
    <Circle
      cx={12}
      cy={12}
      r={10}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Info stem body */}
    <Path
      d="M12 16v-4"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Info top dot */}
    <Path
      d="M12 8h.01"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Info;
