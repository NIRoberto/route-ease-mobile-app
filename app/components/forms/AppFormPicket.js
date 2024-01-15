// AppFormPicker.js

import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import AppPicker from "./AppPicker";
import ErrorMessage from "./ErrorMessage";

const AppFormPicker = ({ name, items,  ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View>
      <AppPicker
        items={items}
        selectedItem={values[name]}
        onSelectItem={(item) => {
          setFieldValue(name, item.value);
        }}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default AppFormPicker;
