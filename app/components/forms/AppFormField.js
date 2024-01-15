import { StyleSheet, TextInput, View } from "react-native";
import { useFormikContext } from "formik";
import AppInput from "./AppInput";
import ErrorMessage from "./ErrorMessage";

const AppFormField = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <View>
      <AppInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        label={name}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    marginTop: 10,
    marginLeft: 10,
  },
});
export default AppFormField;
