import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import AppButton from "./AppButton";
import colors from "../../config/colors";

const AppSubmitButton = ({ title, ...props }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <View>
      <AppButton
        title={title}
        handlePress={handleSubmit}
        bgColor={colors.primaryButton}
        {...props}
        color={"white"}
      />
    </View>
  );
};

export default AppSubmitButton;

const styles = StyleSheet.create({});
