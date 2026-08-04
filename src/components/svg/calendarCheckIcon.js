import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarCheckIcon = ({ size = 24, color = "#000", strokeWidth = 1.5, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        {/* Calendar Frame */}
        <Path
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 4h-1V2M8 4V2M3 9h18M5 4h14a2 2 0 0 1 2 2v5M3 14v5a2 2 0 0 0 2 2h7M3 9V6a2 2 0 0 1 2-2"
        />

        {/* Calendar Grid Lines */}
        <Path
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            d="M6 13h1M10 13h1M6 16h1M10 16h1M6 19h1"
        />

        {/* Badge Circle */}
        <Path
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 12a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
        />

        {/* Checkmark */}
        <Path
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.5 18 1.5 1.5 3-3"
        />
    </Svg>
);

export default CalendarCheckIcon;
