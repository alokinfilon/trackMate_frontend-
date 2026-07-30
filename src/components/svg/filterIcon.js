import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FilterIcon = ({ size = 24, color = "black", strokeWidth = 2, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}          // Controlled dynamically by size prop
        height={size}         // Controlled dynamically by size prop
        viewBox="0 0 24 24"   // Keeps your filter path perfectly centered when scaling
        fill="none"
        {...props}
    >
        <Path
            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
            stroke={color}             // Controlled dynamically by color prop
            strokeWidth={strokeWidth}  // Controlled dynamically by strokeWidth prop
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default FilterIcon;
