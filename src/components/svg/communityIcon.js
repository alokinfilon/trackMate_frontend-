import * as React from "react"
import Svg, { Path, LinearGradient, Stop, Defs } from "react-native-svg"

const CommunityIcon = ({ focused, color = "#b8b8b8", ...props }) => {
  // Selects gradient reference key if active, defaults back to navigation color if inactive
  const strokeColor = focused ? "url(#communityGrad)" : color;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Defs>
        {/* Core 90.92deg active color gradient stops */}
        <LinearGradient id="communityGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="1.05%" stopColor="#FBB59E" />
          <Stop offset="32.02%" stopColor="#F8876C" />
          <Stop offset="56.43%" stopColor="#F16646" />
          <Stop offset="98.66%" stopColor="#F98F7A" />
        </LinearGradient>
      </Defs>

      {/* Inner mountain line vectors */}
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m3 16 4.47-4.47a1.81 1.81 0 0 1 2.56 0L14 15.5m0 0 1.5 1.5M14 15.5l1.97-1.97a1.81 1.81 0 0 1 2.56 0L21 16"
      />
      
      {/* Outer picture frame with the top-right corner plus sign feature */}
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 2.5c-4.23 0-6.345 0-7.747 1.198-.2.17-.385.356-.555.555C2.5 5.655 2.5 7.77 2.5 12s0 6.345 1.198 7.747c.17.2.356.385.555.555C5.655 21.5 7.77 21.5 12 21.5s6.345 0 7.747-1.198c.2-.17.385-.356.555-.555C21.5 18.345 21.5 16.23 21.5 12M21.5 6H18m0 0h-3.5M18 6V2.5M18 6v3.5"
      />
    </Svg>
  );
};

export default CommunityIcon;
