import * as React from "react";
import Svg, { Path, LinearGradient, Stop, Defs } from "react-native-svg";

const CartIcon = ({ focused, color = "#b8b8b8", ...props }) => {
  const fillColor = focused ? "url(#cartGrad)" : color;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 24 24" 
      fill="none"
      {...props}
    >
      <Defs>
        <LinearGradient id="cartGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <Stop offset="1.05%" stopColor="#FBB59E" />
          <Stop offset="32.02%" stopColor="#F8876C" />
          <Stop offset="56.43%" stopColor="#F16646" />
          <Stop offset="98.66%" stopColor="#F98F7A" />
        </LinearGradient>
      </Defs>

      <Path 
        fill={fillColor}        
        d="M0 2.25A.75.75 0 0 1 .75 1.5H3a.75.75 0 0 1 .728.568l.727 2.432H21.75a.75.75 0 0 1 .736.888l-2.25 12A.75.75 0 0 1 19.5 18H6a.75.75 0 0 1-.736-.612L3.015 5.41 2.415 3H.75a.75.75 0 0 1-.75-.75M4.653 6l1.97 10.5h12.255L20.847 6zM7.5 18a3 3 0 1 0 0 6 3 3 0 0 0 0-6m10.5 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6m-10.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m10.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3" 
      />
    </Svg>
  );
};

export default CartIcon;
