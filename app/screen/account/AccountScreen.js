import {
  Image,
  Modal,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenComponent from "../../components/ScreenComponent";

import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../../components/typo/AppText";
import { useNavigation } from "@react-navigation/native";
import ReusableModal from "../../components/ReusableModal";
import AppButton from "../../components/forms/AppButton";
import { clearAll, removeData } from "../../config/storage";
import * as Updates from "expo-updates";
import AppContext from "../../context/context";
const ProfileInfo = ({ profileImage, name, email }) => {
  return (
    <View style={styles.profileInfo}>
      <Image
        style={styles.profileImage}
        source={{
          uri: profileImage,
        }}
      />
      <View style={styles.profileInfoText}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};
const AccountScreen = () => {
  const { setUser, user } = useContext(AppContext);
  const [logoutConfirmModel, setLogoutConfirmModel] = useState(false);
  const handleLogout = async () => {
    await removeData("user");
    setLogoutConfirmModel(false);
    setUser(null);
  };

  const handleNo = () => {
    setLogoutConfirmModel(false);
    console.log("No");
  };

  useEffect(() => {}, [logoutConfirmModel]);

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <ProfileInfo
          profileImage={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          name={user.user.fullNames}
          email={user.user.email}
        />

        <SectionList
          sections={[
            {
              title: "Account",
              data: [
                { title: "My Profile", icon: "account" },
                { title: "My Tickets", icon: "ticket" },
                { title: "My Bookings", icon: "book" },
                { title: "Payment Methods", icon: "credit-card" },
              ],
            },
            {
              title: "Support",
              data: [
                { title: "Help Center", icon: "help-circle" },
                { title: "Contact Us", icon: "phone" },
                { title: "About Us", icon: "information" },
                { title: "Logout", icon: "logout" },
              ],
            },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                if (item.icon === "logout") {
                  setLogoutConfirmModel(true);
                } else {
                  console.log(item.title);
                }
              }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.title}>{item.title}</Text>
              </View>
              {item.icon !== "logout" && (
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <AppText text={section.title} bold={true} size={18} />
          )}
          keyExtractor={(item, index) => index}
        />
        <ReusableModal
          animationType=""
          transparent={true}
          modalVisible={logoutConfirmModel}
          setModalVisible={() => setLogoutConfirmModel(false)}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              gap: 20,
            }}
          >
            <AppText text="Logout" bold={false} size={24} color={"red"} />
            <AppText
              text="Are you sure you want to logout?"
              bold={false}
              size={14}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginVertical: 20,
              }}
            >
              <AppButton
                title="No"
                color={"white"}
                bgColor={"red"}
                handlePress={handleNo}
              />
              <AppButton
                title="Yes"
                color={"white"}
                bgColor={colors.primaryButton}
                handlePress={handleLogout}
              />
            </View>
          </View>
        </ReusableModal>
      </View>
    </ScreenComponent>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 0,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },

  profileInfoText: {
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    gap: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  logout: {
    padding: 10,
    // alignItems: "center",
  },
});
