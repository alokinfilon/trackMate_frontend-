import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CollectionIcon = ({ size = 24, color = "black", strokeWidth = 2, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default CollectionIcon;
