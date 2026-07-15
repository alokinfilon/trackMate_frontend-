import * as React from "react"
import Svg, { Path, LinearGradient, Stop, Defs } from "react-native-svg"

const ExploreIcon = ({ focused, color = "#b8b8b8", ...props }) => {
  // Swaps between active gradient ID and standard navigation color
  const strokeColor = focused ? "url(#exploreGrad)" : color;

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
        {/* Core 90.92deg color gradient stops */}
        <LinearGradient id="exploreGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="1.05%" stopColor="#FBB59E" />
          <Stop offset="32.02%" stopColor="#F8876C" />
          <Stop offset="56.43%" stopColor="#F16646" />
          <Stop offset="98.66%" stopColor="#F98F7A" />
        </LinearGradient>
      </Defs>

      {/* Vector path combining magnifying glass circle and handle handle stem */}
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m17 17 4 4M19 11a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"
      />
    </Svg>
  );
};

export default ExploreIcon;
