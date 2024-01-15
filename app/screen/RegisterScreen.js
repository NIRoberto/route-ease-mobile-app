import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/ScreenComponent";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppText from "../components/typo/AppText";
import colors from "../config/colors";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View style={styles.container}>
        <View
          style={{
            gap: 25,
          }}
        >
          <AppText text="Hello there!" color="black" size={30} bold={true} />
          <AppText
            text="Please enter your email and password to create an account"
            color="black"
            size={15}
            center={false}
            bold={false}
          />
        </View>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
            }}
          >
            <AppText
              center={true}
              text="Already have an account?"
              color={"black"}
              size={15}
              bold={false}
            />
            <AppText
              center={true}
              text="Login"
              onPress={() => navigation.navigate("Login")}
              color={colors.primaryButton}
              size={15}
          
              bold={false}
            />
          </View>
          <AppSubmitButton title="Register" />
        </AppForm>
      </View>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 10,
  },
});
