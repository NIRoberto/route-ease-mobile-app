import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AppText = ({ text, color, center, size, bold, ...others }) => {
  return (
    <Text
      style={{
        color: color,
        fontSize: size,
        textAlign: center ? "center" : "left",
        fontWeight: bold ? "bold" : "normal",
      }}
      {...others}
    >
      {text}
    </Text>
  );
};

export default AppText;
