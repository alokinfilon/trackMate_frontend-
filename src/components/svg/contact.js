import * as React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

const Contact = ({ stroke = "#141B34", ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Right binder ring hook fragment */}
    <Path
      d="M16 2v2"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Contact silhouette shoulders */}
    <Path
      d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Left binder ring hook fragment */}
    <Path
      d="M8 2v2"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Contact silhouette head */}
    <Circle
      cx={12}
      cy={11}
      r={3}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Main card background frame */}
    <Rect
      x={3}
      y={4}
      width={18}
      height={18}
      rx={2}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Contact;
