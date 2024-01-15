import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/ScreenComponent";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppText from "../components/typo/AppText";
import AppFormField from "../components/forms/AppFormField";
import colors from "../config/colors";
import AppForm from "../components/forms/AppForm";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = (values) => {
    navigation.navigate("Home");
  };

  return (
    <Screen>
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            gap: 25,
          }}
        >
          <AppText text="Welcome back!" color="black" size={30} bold={true} />
          <AppText
            text="Please enter your email and password to login"
            color="black"
            size={15}
            bold={false}
            center={false}
          />
        </View>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
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
              gap: 25,
            }}
          >
            <AppText
              text="Don't have an account?"
              color={"Black"}
              bold={false}
              center={false}
            />
            <AppText
              text="Register"
              onPress={() => navigation.navigate("Register")}
              color={colors.primaryButton}
              bold={true}
              center={false}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 25,
            }}
          >
            <AppText
              text="Forgot Password?"
              color={colors.primaryText}
              bold={false}
            />
          </View>
          <AppSubmitButton title="Login" />
        </AppForm>
      </View>
    </Screen>
  );
};
export default LoginScreen;
