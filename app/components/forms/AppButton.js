import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../typo/AppText";
import colors from "../../config/colors";

const AppButton = ({ title, bold, color, bgColor, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: bgColor,
          borderRadius: 7,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          width: "100%",
          borderWidth: bold ? 1 : 0,
          borderColor: "gray",
        }}
      >
        <AppText text={title} bold={true} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
