import * as React from "react";
import Svg, { Path } from "react-native-svg";
const loadingIcon = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 3V6"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M12 18V21"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M21 12H18"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M6 12H3"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M18.3635 5.63672L16.2422 7.75804"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M7.75804 16.2422L5.63672 18.3635"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M18.3635 18.3635L16.2422 16.2422"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M7.75804 7.75804L5.63672 5.63672"
      stroke="#ffffff"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default loadingIcon;
