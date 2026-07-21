import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const GlobeLock = ({ stroke = "#141B34", ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Globe shape outline */}
    <Path
      d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Latitude horizontal line fragment */}
    <Path
      d="M2 12h8.5"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lock shackle arch */}
    <Path
      d="M20 6V4a2 2 0 1 0-4 0v2"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lock base body */}
    <Rect
      width={8}
      height={5}
      x={14}
      y={6}
      rx={1}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default GlobeLock;
