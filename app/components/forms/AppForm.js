import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";

import * as Yup from "yup";

const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {() => <View style={styles.container}>{children}</View>}
    </Formik>
  );
};

export default AppForm;

const styles = StyleSheet.create({
  container: {
    gap: 25,
    marginTop: 25,
  },
});
