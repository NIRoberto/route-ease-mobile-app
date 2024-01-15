import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppDatePicker from "./AppDatePicker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const AppFormDatePicker = ({ name, placeholder, value, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <AppDatePicker
        placeholder={placeholder}
        value={values[name]}
        label={name.charAt(0).toUpperCase()+ name.slice(1)}
        onChange={(date) => {
          setFieldValue(name, date);
        }}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDatePicker;

const styles = StyleSheet.create({});
