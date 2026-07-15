import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3 16 4.47-4.47a1.81 1.81 0 0 1 2.56 0L14 15.5m0 0 1.5 1.5M14 15.5l1.97-1.97a1.81 1.81 0 0 1 2.56 0L21 16"
    />
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 2.5c-4.23 0-6.345 0-7.747 1.198-.2.17-.385.356-.555.555C2.5 5.655 2.5 7.77 2.5 12s0 6.345 1.198 7.747c.17.2.356.385.555.555C5.655 21.5 7.77 21.5 12 21.5s6.345 0 7.747-1.198c.2-.17.385-.356.555-.555C21.5 18.345 21.5 16.23 21.5 12M15.5 5.5c.59-.607 2.16-3 3-3 .84 0 2.41 2.393 3 3m-3-2.5v6.5"
    />
  </Svg>
)
export default SvgComponent
