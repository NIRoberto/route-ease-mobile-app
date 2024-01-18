import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Screen from "../components/ScreenComponent";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppText from "../components/typo/AppText";
import AppFormField from "../components/forms/AppFormField";
import colors from "../config/colors";
import AppForm from "../components/forms/AppForm";
import { API } from "../config/axios";
import AppContext from "../context/context";
import { getData, storeData } from "../config/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

// const ReusableTokenExtractor = (token) => {
//   const { decodedToken, isExpired } = useJwt(token);

//   if (isExpired) {
//     return <Text>Expired</Text>;
//   }
//   return decodedToken;
// };

const LoginScreen = () => {
  const { setUser, user } = useContext(AppContext);
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const response = await API.post("auth/login", values);
      storeData("user", response.data);
      setUser(await getData("user"));
    } catch (error) {
      console.log(error?.response?.data);
      if (error?.response) {
        console.log(error?.response?.data);
      } else {
        console.log(error);
      }
    }
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
          <AppText text="Welcome back!" color={"black"} size={30} bold={true} />
          <AppText
            text="Please enter your email and password to login"
            color={"black"}
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
              color={"black"}
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
              center={false}
            />
          </View>
          <AppSubmitButton title="Login" />
        </AppForm>
      </View>
    </Screen>
  );
};
export default LoginScreen;
