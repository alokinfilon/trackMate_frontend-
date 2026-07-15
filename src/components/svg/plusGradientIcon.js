import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const PlusIcon1 = ({ size = 24, strokeWidth = 1.5, loading = false, ...props }) => {
  if (loading) {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        {/* Uses the primary gradient color #FDABAC for the loading spinner */}
        <ActivityIndicator size="small" color="#FDABAC" />
      </View>
    );
  }

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}          // Controlled dynamically by size prop
      height={size}         // Controlled dynamically by size prop
      viewBox="0 0 24 24"   // Keeps crosshair vector lines perfectly pixel-aligned
      fill="none"
      {...props}
    >
      <Defs>
        {/* 90.92deg is roughly a horizontal left-to-right gradient */}
        <LinearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="1.05%" stopColor="#FDABAC" />
          <Stop offset="98.66%" stopColor="#FDEABF" />
        </LinearGradient>
      </Defs>
      <Path
        stroke="url(#iconGradient)"  // Controlled dynamically by the gradient definition
        strokeWidth={strokeWidth}    // Controlled dynamically by strokeWidth prop
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.002 5v14.002M19.002 12.002H5"
      />
    </Svg>
  );
};

export default PlusIcon1;